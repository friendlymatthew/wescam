import { Test, TestingModule } from "@nestjs/testing";
import { JuliaService } from "../../src/core/julia/service/julia.service";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateUserInput } from "../../src/core/julia/dto/create-user.input";
import { Prisma, User } from "@prisma/client";

describe("JuliaService", () => {
	let service: JuliaService;
	let mockPrismaService: Partial<PrismaService>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JuliaService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<JuliaService>(JuliaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Add tests for other methods here
});
