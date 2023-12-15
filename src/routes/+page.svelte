<script>
  import { selectedOrder } from './stores.js';
  import OrdersTable from './OrdersTable.svelte';

  let password = ""; // Variable para almacenar la contraseña
  let isPasswordCorrect = false; // Variable para verificar si la contraseña es correcta
  let isPasswordVerified = false; // Variable para verificar si la contraseña ya ha sido verificada con éxito

  // Función para verificar la contraseña
  function checkPassword() {
    // Comparar la contraseña ingresada con la contraseña esperada (por ejemplo, "12345")
    if (password === "12345") {
      isPasswordCorrect = true; // Si coinciden, establecemos la variable en true
    } else {
      isPasswordCorrect = false; // Si no coinciden, establecemos la variable en false
    }
    
    isPasswordVerified = isPasswordCorrect; // Establecemos isPasswordVerified en el mismo valor que isPasswordCorrect
  }

  // Función para manejar el evento cuando se hace clic en el botón para verificar la contraseña
  function handlePasswordCheck() {
    checkPassword(); // Llama a la función de verificación de contraseña
  }
</script>

<div>
  <!-- Input para ingresar la contraseña -->
  {#if !isPasswordVerified}
    <input type="password" bind:value={password} placeholder="Ingrese la contraseña" />
    <button on:click={handlePasswordCheck}>Verificar contraseña</button>
  {/if}
</div>

<!-- Renderiza OrdersTable solo si la contraseña es correcta -->
{#if isPasswordCorrect}
  <OrdersTable />
{/if}
