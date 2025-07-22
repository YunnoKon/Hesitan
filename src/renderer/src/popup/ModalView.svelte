<script>
  // Importing States
  import { PopUpState } from '../states/PopUpState.svelte'

  // Modal
  import TaskCreation from './modal/TaskCreation.svelte'
  import TaskDetails from './modal/TaskDetails.svelte'
  import DateDetails from './modal/DateDetails.svelte'
  import DateSelect from './modal/DateSelect.svelte'
  import TaskDeletion from './modal/TaskDeletion.svelte'

  const ModalType = { 
    TaskCreation,
    TaskDetails,
    DateDetails,
    DateSelect,
    TaskDeletion
  }
</script>

{#each PopUpState.activeModal as modal (modal.id)}
    {@const ModalComponent = ModalType[modal.type]}
    <ModalComponent bind:data={modal.data}/>
{/each}
