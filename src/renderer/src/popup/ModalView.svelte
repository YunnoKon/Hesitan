<script>
  // Importing States
  import { PopUpState } from '../states/PopUpState.svelte'

  // Modal
  import TaskCreation from './modal/TaskCreation.svelte'
  import TaskDetails from './modal/TaskDetails.svelte'
  import DateDetails from './modal/DateDetails.svelte'
  import TaskDeletion from './modal/TaskDeletion.svelte'
  import RoadmapPreview from './modal/RoadmapPreview.svelte'
  import ChatDeletion from './modal/ChatDeletion.svelte'
  import ChatSettings from './modal/ChatSettings.svelte'

  const ModalType = { 
    TaskCreation,
    TaskDetails,
    DateDetails,
    TaskDeletion,
    RoadmapPreview,
    ChatDeletion,
    ChatSettings
  }
</script>

{#each PopUpState.activeModal as modal (modal.id)}
    {@const ModalComponent = ModalType[modal.type]}
    <ModalComponent bind:data={modal.data}/>
{/each}
