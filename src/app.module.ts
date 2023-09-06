import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CoreModule } from "./core/core.module";
import GraphQLJSON from "graphql-type-json";
import { GraphQLError } from "graphql";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			resolvers: { JSON: GraphQLJSON },
			formatError: (error: GraphQLError) => {
				error.extensions.stacktrace = undefined;
				return error;
			},
			csrfPrevention: false, // TODO: discuss
		}),
		CoreModule,
	],
	providers: [AppService],
})
export class AppModule {}
