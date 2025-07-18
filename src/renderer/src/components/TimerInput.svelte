<script>
  let { hour = $bindable(), minute = $bindable() } = $props()

  const pad = (n) => n.toString().padStart(2, "0");

  function clampHour() {
    let n = parseInt(hour.replace(/\D/g, ""));
    if (isNaN(n)) n = 0;
    if (n < 0) n = 0;
    if (n > 23) n = 23;
    hour = pad(n);
  }

  function clampMinute() {
    let n = parseInt(minute.replace(/\D/g, ""));
    if (isNaN(n)) n = 0;
    if (n < 0) n = 0;
    if (n > 59) n = 59;
    minute = pad(n);
  }

  function incHour(){ clampHour(); hour = pad((Number(hour)+1) % 24); }
  function decHour(){ clampHour(); hour = pad((Number(hour)+ 23) % 24); }
  function incMinute(){ clampMinute(); minute = pad((Number(minute)+ 1) % 60); }
  function decMinute(){ clampMinute(); minute = pad((Number(minute)+ 59) % 60); }
</script>

<div class="flex justify-center items-center gap-3 py-3">
  <div class="flex flex-col items-center">
    <h1 class="text-gray-500">Hours</h1>
    <div class="flex flex-col items-center font-bold">
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={incHour}>▲</button>
      <input bind:value={hour} class="font-dot text-center text-3xl outline-none w-12" type="text" inputmode="numeric" maxlength="2" onblur={clampHour}/>
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={decHour}>▼</button>
    </div>
  </div>

  <div class="">
    <h1 class="text-2xl mt-5 font-dot">:</h1>
  </div>

  <div class="flex flex-col items-center">
    <h1 class="text-gray-500">Minute</h1>
    <div class="flex flex-col items-center font-bold">
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={incMinute}>▲</button>
      <input bind:value={minute} class="font-dot text-center text-3xl outline-none w-12" type="text" inputmode="numeric" maxlength="2" onblur={clampMinute}/>
      <button type="button" class="hover:cursor-pointer w-12 h-8 text-xl" onclick={decMinute}>▼</button>
    </div>
  </div>
</div>
