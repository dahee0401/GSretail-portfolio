<template>
    <component
        :is="tag"
        :href="tag === 'a' ? href : null"
        :type="tag === 'button' ? 'button' : null"
        :class="btnClass"
        :disabled="disabled"
        @click="$emit('click', $event)"
    >
        <slot />
    </component>
</template>

<script>
export default {
    name: "Buttons",
    props: {
        tag: { type: String, default: "button" }, // button / a
        href: { type: String, default: "#none" },
        btnClass: { type: String, default: "btn_fill" },
        disabled: { type: Boolean, default: false },

        // tag: { type: String, default: "button" },
        // href: { type: String, default: "#none" },
        // btnClass: {
        //     type: [String, Array, Object],
        //     default: () => "btn_fill"
        // },
        // disabled: { type: Boolean, default: false }
    },
};
</script>