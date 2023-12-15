<script>
  import { selectedOrder } from './stores.js';
  import OrdersTable from './OrdersTable.svelte';

  let loadingEnviandoGuia = true;
  let loadingDisplay = "d-none";
  let buttonSendTracking = "";

  $: {
    // Utiliza una declaración reactiva para actualizar buttonSendTracking
    if (loadingDisplay === "d-none") {
      buttonSendTracking = "";
    } else {
      buttonSendTracking = "d-none";
    }
  }

  /* Aquí defines las propiedades que vas a utilizar de selectedOrder para luego
  poder hacer el Bind en el formulario. 
  Las defines individualmente 2 veces, ya que es la segunda la que se deja editar en el formulario */

  $: dateShipped = $selectedOrder.meta_data.find(item => item.key === 'svc_shippingInfo').value.dateShipped; 

  $: shippingProvider = $selectedOrder.meta_data.find(item => item.key === 'svc_shippingInfo').value.shippingProvider;

  $: trackingId = $selectedOrder.meta_data.find(item => item.key === 'svc_shippingInfo').value.trackingId;

  $: invoiceDate = $selectedOrder.meta_data.find(item => item.key === 'svc_invoice').value.dateInvoiced;

  $: invoiceNumber = $selectedOrder.meta_data.find(item => item.key === 'svc_invoice').value.invoiceNumber;

  $: formData = {
    fechaFactura: new Date().toISOString().split('T')[0],
    numeroFactura: invoiceNumber, 
    transportadora: shippingProvider, 
    numeroGuia: trackingId,
    fechaGuia: new Date().toISOString().split('T')[0],
    esEdicionGuia: false
  };

  // Rest API hace GET para traer los pedidos.
  async function enviarGuia() {
    // Antes de realizar la solicitud, establece loadingDisplay en ""
    loadingDisplay = "";

    try {
      const response = await fetch("https://hook.us1.make.com/a24rndbu2pd9rmbgnn12a1vfxivevqrb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: {
            orderId: $selectedOrder.id,
            customerCountry: "CO",
            customerPhone: "+573108472194",
            meta_key_1: "svc_shippingInfo",
            meta_value_1: {
              date: formData.fechaGuia,
              trackingId: formData.numeroGuia,
              shippingProvider: formData.transportadora
            },
            meta_key_2: "svc_invoice",
            meta_value_2: {
              dateInvoiced: formData.fechaFactura,
              invoiceNumber: formData.numeroFactura
            }
          }
        })
      });

      if (response.ok) {
        alert("Guía enviada exitosamente");
      } else {
        console.error("Error al enviar la guía:", response.statusText);
      }
    } catch (error) {
      console.error("Error inesperado al enviar la guía:", error);
    } finally {
      // Después de recibir la respuesta, establece loadingDisplay en "d-none" nuevamente
      loadingDisplay = "d-none";


</script>

  <!-- Formulario de Guía -->
  <!-- FECHA FACTURA -->
 <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">Fecha Factura
      <i class="bi bi-calendar"></i>
    </span>
    <input type="date" class="form-control" placeholder="Fecha" aria-label="Fecha" aria-describedby="basic-addon1" bind:value={formData.fechaFactura}>
  </div>
 <!-- NUMERO DE FACTURA -->
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon2">Factura #</span>
    <input type="text" class="form-control" placeholder="Número de factura" aria-label="Número de factura" aria-describedby="basic-addon2" bind:value={formData.numeroFactura}>
  </div>
 <!-- TRANSPORTADORA -->
  <div class="input-group mb-3">
    <label for="transportadora" class="input-group-text">Transportadora</label>
    <select class="form-select" id="transportadora" aria-label="Transportadora" bind:value={formData.transportadora}>
      <option value="Coordinadora">Coordinadora</option>
      <option value="Servientrega">Servientrega</option>
      <option value="Tcc">TCC</option>
      <option value="Interrapidisimo">Interrapidisimo</option>
      <option value="Domicilio">Domicilio</option>
    </select>
  </div>
 <!-- NUMERO DE GUIA -->
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon4">Guía #</span>
    <input type="text" class="form-control" placeholder="Número de guía" aria-label="Número de guía" aria-describedby="basic-addon4" bind:value={formData.numeroGuia}>
  </div>

<!-- FECHA GUIA -->
 <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">Fecha Guía
      <i class="bi bi-calendar"></i>
    </span>
    <input type="date" class="form-control" placeholder="Fecha" aria-label="Fecha" aria-describedby="basic-addon1" bind:value={formData.fechaFactura}>
  </div>

 <!-- ENVIAR GUIA AL CLIENTE WHATSAPP 
  <div class="input-group mb-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="edicionGuia" bind:checked={formData.esEdicionGuia}>
      <label class="form-check-label" for="edicionGuia">
        Enviar guía al cliente
      </label>
    </div>
  </div>
  -->
 <!-- BOTON DE ENVIAR GUIA -->
<div class="input-group">
<button class="btn btn-primary w-100 {buttonSendTracking}" type="button" on:click={enviarGuia}>Enviar guía</button>
</div>

<!-- BOTON ENVIANDO GUIA -->
<div class="input-group">
  <button class="btn btn-primary w-100 {loadingDisplay}" disabled type="button" id="botonEnviandoGuia">
    <span id="textoBoton">Enviando Guía</span>
    <!-- Icono de carga (oculto inicialmente) -->
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="iconoCarga"></span>
  </button>
</div>
