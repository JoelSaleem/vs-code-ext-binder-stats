<script>
  export let isShowing;
  export let onClick;
  export let resource;
</script>

<button on:click="{onClick}">{ isShowing ? "hide" : "show" } {resource}</button>
