<script setup></script>

<template>
    <span class="process_flow_arrow" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="15" viewBox="0 0 42 15" fill="none">
            <path d="M1 6.36328H0V8.36328H1V7.36328V6.36328ZM41.7071 8.07039C42.0976 7.67986 42.0976 7.0467 41.7071 6.65617L35.3431 0.292213C34.9526 -0.0983109 34.3195 -0.0983109 33.9289 0.292213C33.5384 0.682738 33.5384 1.3159 33.9289 1.70643L39.5858 7.36328L33.9289 13.0201C33.5384 13.4107 33.5384 14.0438 33.9289 14.4343C34.3195 14.8249 34.9526 14.8249 35.3431 14.4343L41.7071 8.07039ZM1 7.36328V8.36328H41V7.36328V6.36328H1V7.36328Z" fill="#107AF2" />
        </svg>
    </span>
</template>

<style scoped>
.process_flow_arrow { flex-shrink: 0; align-self: center; display: inline-flex; line-height: 0; }
.process_flow_arrow svg { width: 42px; height: 15px; display: block; }
@media (max-width: 768px) { 
    .process_flow_arrow { display: flex; justify-content: center; align-items: center; width: 100%; min-height: 42px;  box-sizing: border-box; } 
    .process_flow_arrow svg { transform: rotate(90deg); flex-shrink: 0; }    
}
</style>
