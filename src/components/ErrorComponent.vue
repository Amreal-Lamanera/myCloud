<template>
    <div v-if="errorMsg" class="p-4">
        <span 
          class="
            text-xl 
            text-red-500 
            bg-gray-200 
            p-3 
            border-4 
            border-red-500
            flex
          "
        >
            {{ errorMsg}}
          </span>
      </div>
</template>

<script>

    export default {
        props: {
            errorMsg:String,
        }
    }

</script>