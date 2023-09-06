import { Module } from "@nestjs/common";
import { EntityResolver } from "../resolvers/entity.resolvers";
import { EntityService } from "../service/entity.service";

@Module({
	providers: [EntityResolver, EntityService],
})
export class EntityModule {}
