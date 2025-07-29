<script>
  // Importing States
  import { PopUpState } from '../states/PopUpState.svelte'

  // Auto-loading modal from ./modal
  const modules = import.meta.glob('./modal/*.svelte', {
    eager: true,
    import: 'default'
  });

  const ModalType = {};
  Object.entries(modules).forEach(([path, comp]) => {
    const name = path.split('/').pop().replace('.svelte', '');
    ModalType[name] = comp;
  });
</script>

{#each PopUpState.activeModal as modal (modal.id)}
    {@const ModalComponent = ModalType[modal.type]}
    <ModalComponent bind:data={modal.data}/>
{/each}
