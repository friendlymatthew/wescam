import { Test, TestingModule } from "@nestjs/testing";
import { JuliaService } from "../../src/core/julia/service/julia.service";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateUserInput } from "../../src/core/julia/dto/create-user.input";
import { Prisma, User } from "@prisma/client";

describe("JuliaService", () => {
	let service: JuliaService;
	let mockPrismaService: Partial<PrismaService>;

	beforeEach(async () => {
		mockPrismaService = {
			user: {
				create: jest.fn().mockImplementation((userData) =>
					Promise.resolve({
						id: "1",
						...userData.data,
					})
				),
			},
		};

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

	describe("createUser", () => {
		it("should create a new user", async () => {
			const input: CreateUserInput = {
				name: "John Doe",
				email: "john.doe@example.com",
				pronouns: "he/him",
				classYear: 2025,
			};

			const result = await service.createUser(input);

			expect(result).toBeDefined();
			expect(result.name).toEqual(input.name);
			expect(result.email).toEqual(input.email);
			expect(result.pronouns).toEqual(input.pronouns);
			expect(result.classYear).toEqual(input.classYear);

			// Check if Prisma's create method has been called with the correct parameters
			expect(mockPrismaService.user.create).toHaveBeenCalledWith({
				data: {
					id: expect.anything(), // Since ID might be dynamically generated, we don't check it.
					name: input.name,
					email: input.email,
					pronouns: input.pronouns,
					classYear: input.classYear,
				},
			});
		});
	});

	// Add tests for other methods here
});
