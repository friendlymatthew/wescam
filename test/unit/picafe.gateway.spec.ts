import { Test, TestingModule } from "@nestjs/testing";
import { PicafeGateway } from "../../src/core/picafe/gateway/picafe.gateway";
import { PicafeService } from "../../src/core/picafe/service/picafe.service";
import { types } from "cassandra-driver";
import { Message } from "src/core/picafe/entities/message.entities";
import { Server, Socket } from "socket.io";
import { MiguelService } from "src/core/picafe/service/miguel.service";

jest.mock("socket.io");
jest.mock("../../src/core/picafe/service/miguel.service");
jest.mock("../../src/core/picafe/service/picafe.service");

describe("PicafeGateway", () => {
	let gateway: PicafeGateway;
	let mockMiguelService: jest.Mocked<MiguelService>;
	let mockPicafeService: jest.Mocked<PicafeService>;
	let mockSocket: jest.Mocked<Socket>;
	let mockServer: jest.Mocked<Server>;
	/*
	beforeEach(async () => {
		mockSocket = new Socket() as jest.Mocked<Socket>;
		mockServer = new Server() as jest.Mocked<Server>;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PicafeGateway,
				{
					provide: MiguelService,
					useValue: new MiguelServ c√fxcvb 'ice(),
				},
				{
					provide: PicafeService,
					useValue: new PicafeService(),
				},
			],
		}).compile();

		gateway = module.get<PicafeGateway>(PicafeGateway);
		mockMiguelService = module.get(MiguelService);
		mockPicafeService = module.get(PicafeService);

		gateway.server = mockServer;
	});

	it("should be defined", () => {
		expect(gateway).toBeDefined();
	});

	it("should handle join room successfully", async () => {
		const mockRoomId = types.Uuid.random();

		await gateway.handleJoinRoom(mockSocket, mockRoomId);

		expect(mockMiguelService.createConsumerForRoom).toHaveBeenCalledWith(
			mockRoomId.toString()
		);
		expect(mockSocket.join).toHaveBeenCalledWith(mockRoomId.toString());
	});
  */
});
