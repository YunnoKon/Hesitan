<script>
  // Importing States
  import { PageState } from '../states/PageState.svelte'

  // Pages
  import Today from './pages/Today.svelte';
  import Calendar from './pages/Calendar.svelte'
  import Create from './pages/Create.svelte'
  import Settings from './pages/Settings.svelte';

  const pages = { 
    today: Today, 
    calendar: Calendar,
    create: Create,
    settings: Settings
  }
</script>

{#each Object.entries(pages) as [key,Component]}
  <div class={PageState.current==key ? 'block' : 'hidden'}>
    <Component/>
  </div>
{/each}
