<script>
  import { selectedOrder } from './stores.js';
  import { onMount, createEventDispatcher } from "svelte";

  let orderId = "";
  let currentPage = 1; // Página actual
  const itemsPerPage = 30; // Cantidad de elementos por página


//INICIA COMPONENTE FORMULARIO//

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

      //LLAMA NUEVAMENTE A FETCH ORDERS
     fetchOrders();
    }
  }
//TERMINA LO QUE ERA DEL COMPONENTE FORMULARIO//


  let orderList = []; // Variable para almacenar los datos de pedidos

  // Función para realizar la solicitud HTTP y obtener los datos de pedidos
 async function fetchOrders() {
  try {
    const apiUrl =
      "https://woocommerce-831138-3583701.cloudwaysapps.com/wp-json/wc/v3/orders/";

    // Claves de autenticación
    const consumerKey = "ck_842f7b942db70b69822d514b979dae82df380132";
    const consumerSecret = "cs_576268a3c218bba000615c46612de32ba0d9659e";

    // Parámetros de la solicitud
    const params = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      per_page: itemsPerPage,
      page: currentPage, // Utiliza la página actual
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const data = await response.json();


     orderList = data;

    // Muestra la respuesta en la consola
    console.log("Respuesta de la solicitud:", data);
  } catch (error) {
    console.error("Error al obtener los datos de pedidos:", error);
  }
}

  // Llama a la función para obtener los datos cuando el componente se monta
  onMount(fetchOrders);


// Función para buscar un pedido específico por ID
async function searchOrder(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  try {
    const apiUrl =
      `https://woocommerce-831138-3583701.cloudwaysapps.com/wp-json/wc/v3/orders/${orderId}`;

    // Claves de autenticación
    const consumerKey = "ck_842f7b942db70b69822d514b979dae82df380132";
    const consumerSecret = "cs_576268a3c218bba000615c46612de32ba0d9659e";

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
    });

    if (response.ok) {
      const orderData = await response.json();
      // Actualiza el orderList con los datos del pedido encontrado
      orderList = [orderData]; // Almacena el resultado en un array para que coincida con el formato de orderList
    } else {
      console.error("Error al buscar el pedido:", response.statusText);
    }
  } catch (error) {
    console.error("Error inesperado al buscar el pedido:", error);
  }
}




  // Función para acceder al valor de una clave específica en meta_data
  function getOrderMetaValue(order, key) {
    const metaItem = order.meta_data.find(item => item.key === key);
    return metaItem ? metaItem.value : null;
  }

  // Función que cuando se selecciona una orden, o se da click en editar o ver, se actualiza con SET la variable en el store.js
  function selectOrder(order) {
    selectedOrder.set(order);
  }



  // Función para ir a la página anterior
function previousPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    fetchOrders();
  }
}

// Función para ir a la página siguiente
function nextPage() {
  currentPage += 1;
  fetchOrders();
}

// Función para ir a una página específica
function goToPage(page) {
  return () => {
    currentPage = page;
    fetchOrders();
  };
}



</script>


<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Envío de Guías</a>
    <form class="d-flex" on:submit={searchOrder}>
      <input bind:value={orderId} class="form-control me-2" type="search" placeholder="Pedido #" aria-label="Search">
      <button class="btn btn-outline-primary" type="submit">Buscar</button>
    </form>
<button on:click={() => {
  // Cuando se haga clic en el botón, se ejecutará esta función flecha
  orderId = ""; // Aquí reseteamos la variable orderId asignándole una cadena vacía
  fetchOrders(); // Luego llamamos a la función fetchOrders para obtener los pedidos actualizados
}} class="btn btn-primary" type="button">
  <i class="bi bi-arrow-clockwise"></i> Actualizar
</button>


  </div>
</nav>






<div class="container-fluid mt-4">
  <table class="table w-100">
    <thead>
      <tr>
        <th>Pedido</th>
        <th>Fecha</th>
        <th>Estado</th>
        <th>Cliente</th>
        <th>Factura</th>
        <th>Transportadora</th>
        <th>Guía</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
       {#each orderList as order (order.id)}
        <tr>
          <td>{order.id}</td>
          <td>{order.date_created}</td>
          <td>  <span class="badge rounded-pill bg-primary">
    {order.status}
  </span></td>
          <td>{order.billing.first_name} {order.billing.last_name}</td>
          <td>{getOrderMetaValue(order, 'svc_invoice') ? getOrderMetaValue(order, 'svc_invoice').invoiceNumber : 'Pendiente'}</td>
          <td>{getOrderMetaValue(order, 'svc_shippingInfo') ? getOrderMetaValue(order, 'svc_shippingInfo').shippingProvider : 'NA'}</td>
          <td>{getOrderMetaValue(order, 'svc_shippingInfo') ? getOrderMetaValue(order, 'svc_shippingInfo').trackingId : 'NA'}</td>
          <td>
            <button class="btn btn-primary d-none">Ver</button>
           <button class="btn btn-primary" on:click={() => selectOrder(order)} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Enviar Guia</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>


<div class="d-flex justify-content-center">
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" on:click={previousPage}>
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#" on:click={goToPage(1)}>{currentPage}</a></li>
      <!-- Agrega más números de página según sea necesario -->
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" on:click={nextPage}>
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</div>







<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Enviar Guia al Pedido {$selectedOrder.id}</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

  <div class="offcanvas-body">
 <!-- INICIA CONTENIDO DEL OFFCANVAS --> 

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


 <!-- TERMINA CONTENIDO DEL OFFCANVAS -->
  </div>

</div>