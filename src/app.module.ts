import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CoreModule } from "./core/core.module";
import GraphQLJSON from "graphql-type-json";
import { GraphQLError } from "graphql";
import { AppResolver } from "./app.resolver";
import { HolidayInnResolver } from "./core/julia/resolvers/holidayinn.resolvers";
import { EntityResolver } from "./core/julia/resolvers/entity.resolvers";
import { ScyllaModule } from "./core/picafe/scylla/scylla.module";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
		}),
		CoreModule,
		ScyllaModule,
	],
	providers: [AppResolver],
})
export class AppModule {}
