import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CoreModule } from "./core/core.module";
import { AppResolver } from "./app.resolver";
import { ConfigModule } from "@nestjs/config"

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
		}),
		ConfigModule.forRoot(),
		CoreModule,
	],
	providers: [AppResolver],
})
export class AppModule {}
