<script>
  // Importing States
  import { PageState } from '../../states/PageState.svelte'

  // Tools
  import Roadmap from './Roadmap.svelte';
  import Tutor from './Tutor.svelte'

  const tools = { 
    roadmap: Roadmap,
    tutor: Tutor
  }
</script>

{#each Object.entries(tools) as [key,Component]}
  <div class={PageState.createTool==key ? 'block' : 'hidden'}>
    <Component/>
  </div>
{/each}
