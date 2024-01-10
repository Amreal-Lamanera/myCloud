<template>
  <section class="upload flex justify-center items-center h-full container p-4 max-w-xl mx-auto">
    <div class="w-full bg-slate-700 rounded-lg shadow-lg overflow-hidden">
      <!-- <form action="http://francescopieraccini.localhost/admin/c-panel/apis/insertImgsInCloud.php" method="POST" enctype="multipart/form-data" class="p-14 text-xs sm:text-base" id="form-upload"> -->
      <form action="../apis/insertImgsInCloud.php" method="POST" enctype="multipart/form-data" class="p-14 text-xs sm:text-base" id="form-upload">
        <input
          name="file_to_upload[]"
          required
          class="cursor-pointer text-white form-input w-full bg-blue-600 rounded-full"
          type="file"
          multiple
        >
        <div class="text-center">
          <input type="submit" value="CARICA" class="btn cursor-pointer text-white mt-2 bg-blue-600 p-3 border border-white rounded-full hover:bg-blue-950">
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  export default {
    mounted() {
      document.title = 'myCloud - Upload';
    },
  }
</script>
