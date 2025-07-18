<script>
  // Importing States
  import { PopUpState } from '../states/PopUpState.svelte'

  // Alert Box
  import AlertBox from './AlertBox.svelte';
</script>

{#each PopUpState.activeAlert as alert (alert.id)}
    <AlertBox message={alert.message} time=3000/>
{/each}
