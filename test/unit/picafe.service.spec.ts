import { Test, TestingModule } from "@nestjs/testing";
import { PicafeService } from "../../src/core/picafe/service/picafe.service";
import { Producer } from "pulsar-client";
import { types } from "cassandra-driver";
import { Logger } from "@nestjs/common";
import { Message } from "src/core/picafe/entities/message.entities";

jest.mock("pulsar-client", () => {
	return {
		Producer: jest.fn().mockImplementation(() => {
			return { send: jest.fn() };
		}),
	};
});

function mockUuid(): types.Uuid {
	return types.Uuid.random();
}

function mockTimeUuid(): types.TimeUuid {
	return types.TimeUuid.now();
}

function generateMockMessage(): Message {
	return {
		message_id: mockTimeUuid(),
		room_id: mockUuid(),
		sender_id: mockUuid(),
		content: "Test content",
		timestamp: new Date(),
		medialink: "http://example.com/media",
	};
}

describe("PicafeService", () => {
	let service: PicafeService;
	let mockProducer: jest.Mocked<Producer>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PicafeService,
				{
					provide: "MIGUEL",
					useValue: new Producer(),
				},
			],
		}).compile();

		service = module.get<PicafeService>(PicafeService);
		mockProducer = jest.mocked(module.get<Producer>("MIGUEL"), {
			shallow: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should successfully send message", async () => {
		const mockMessage = generateMockMessage();
		jest.spyOn(Logger.prototype, "error").mockImplementation(() => {});

		mockProducer.send.mockRejectedValue(new Error("Failed to send message"));

		await expect(service.createMessage(mockMessage)).rejects.toThrow(
			"Failed to handle message"
		);

		expect(Logger.prototype.error).toHaveBeenCalledWith(
			"Failed to handle message: Failed to send message"
		);
	});

	it("should successfully create and send message to producer", async () => {
		const mockMessage = generateMockMessage();
		// @ts-ignore
		mockProducer.send.mockResolvedValue(undefined);

		await service.createMessage(mockMessage);
		expect(mockProducer.send).toHaveBeenCalledWith({
			data: Buffer.from(JSON.stringify(mockMessage)),
			partitionKey: mockMessage.room_id.toString(),
		});
	});

	it("should log error and throw when producer fails", async () => {
		const mockMessage = generateMockMessage();
		mockProducer.send.mockRejectedValue(new Error("Producer Failure"));

		await expect(service.createMessage(mockMessage)).rejects.toThrow(
			"Failed to handle message"
		);
		expect(Logger.prototype.error).toHaveBeenCalledWith(
			"Failed to handle message: Producer Failure"
		);
	});
});
