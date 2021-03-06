package ch.maxant.kdc.mf.contracts.dto

import ch.maxant.kdc.mf.contracts.definitions.Configuration
import ch.maxant.kdc.mf.contracts.entity.ComponentEntity
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import java.util.*
import kotlin.collections.ArrayList

data class Component(
        val id: UUID,
        val parentId: UUID?,
        val componentDefinitionId: String,
        val configs: List<Configuration<*>>
) {
    constructor(om: ObjectMapper, entity: ComponentEntity) : this(
            entity.id,
            entity.parentId,
            entity.componentDefinitionId,
            om.readValue<ArrayList<Configuration<*>>>(entity.configuration)
    )
}