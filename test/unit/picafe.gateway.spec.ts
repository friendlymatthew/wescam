import { Test, TestingModule } from "@nestjs/testing";
import { PicafeGateway } from "../../src/core/picafe/gateway/picafe.gateway";
import { PicafeService } from "../../src/core/picafe/service/picafe.service";
import { types } from "cassandra-driver";
import { Message } from "src/core/picafe/entities/message.entities";
import { Server, Socket as IOSocket } from "socket.io";
import { PulsarService } from "src/core/picafe/service/pulsar.service";

jest.mock("../../src/core/picafe/service/miguel.service");
jest.mock("../../src/core/picafe/service/picafe.service");

describe("PicafeGateway", () => {
	let gateway: PicafeGateway;
	let mockMiguelService: jest.Mocked<PulsarService>;
	let mockPicafeService: jest.Mocked<PicafeService>;
	let mockSocket: Partial<IOSocket>;
	let mockServer: Partial<Server>;

	beforeEach(async () => {
		mockServer = {
			to: jest.fn().mockReturnThis(),
			emit: jest.fn(),
		};

		mockSocket = {
			id: "socket-id",
			join: jest.fn(),
			leave: jest.fn(),
			emit: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PicafeGateway,
				{ provide: PulsarService, useValue: {} },
				{ provide: PicafeService, useValue: {} },
			],
		}).compile();

		gateway = module.get<PicafeGateway>(PicafeGateway);

		gateway.server = mockServer as Server;
	});

	// Basic test to ensure the gateway exists
	it("should be defined", () => {
		expect(gateway).toBeDefined();
	});
});
