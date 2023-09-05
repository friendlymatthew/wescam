enum Entity {
	UNKNOWN = "unknown",
	ROGUE = "rogue",
	ACTIVE = "active",
}

export interface JuliaServiceInterface {
	/* A pure function where upon user id, we ensure the id isn't foreign*/
	validateEntity(entityId: string): Promise<Entity>;
}
