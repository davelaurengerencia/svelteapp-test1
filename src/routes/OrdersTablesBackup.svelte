<script>
  import { selectedOrder } from './stores.js';




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
        per_page: 10,
        page: 1,
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

  // Función para acceder al valor de una clave específica en meta_data
  function getOrderMetaValue(order, key) {
    const metaItem = order.meta_data.find(item => item.key === key);
    return metaItem ? metaItem.value : null;
  }

  // Función que cuando se selecciona una orden, o se da click en editar o ver, se actualiza con SET la variable en el store.js
  function selectOrder(order) {
    selectedOrder.set(order);
  }

  // Maneja el evento personalizado "ordersUpdated" para volver a //cargar los datos cuando se emite desde Formulario.svelte
  //function handleOrdersUpdated() {
  //  fetchOrders();
  //}

  // Escucha el evento personalizado
  //dispatch("ordersUpdated", handleOrdersUpdated);

    // Escucha el evento personalizado "actualizarPedidos" emitido desde ButtonGetOrders.svelte
  function handleActualizarPedidos() {
    fetchOrders(); // Llama a la función fetchOrders para actualizar los pedidos
  }
</script>

<button on:click={fetchOrders}>ACTUALIZAR GUIAS</button>
<div class="container mt-4">
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
          <td>{order.status}</td>
          <td>{order.billing.first_name} {order.billing.last_name}</td>
          <td>{getOrderMetaValue(order, 'svc_invoice') ? getOrderMetaValue(order, 'svc_invoice').invoiceNumber : 'Pendiente'}</td>
          <td>{getOrderMetaValue(order, 'svc_shippingInfo') ? getOrderMetaValue(order, 'svc_shippingInfo').shippingProvider : 'NA'}</td>
          <td>{getOrderMetaValue(order, 'svc_shippingInfo') ? getOrderMetaValue(order, 'svc_shippingInfo').trackingId : 'NA'}</td>
          <td>
            <button class="btn btn-primary">Ver</button>
           <button class="btn btn-secondary" on:click={() => selectOrder(order)} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Editar</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>