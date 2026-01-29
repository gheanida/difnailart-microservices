<template>
    <div>
        <h2>My Orders</h2>
        <div v-if="orders.length === 0">
            <p>No orders yet. <router-link to="/products">Browse products</router-link></p>
        </div>
        <div v-else>
            <div v-for="order in orders" :key="order.id" class="card mb-3">
                <div class="card-header">
                    Order #{{ order.id }} - {{ order.status }}
                </div>
                <div class="card-body">
                    <p><strong>Date:</strong> {{ formatDate(order.created_at) }}</p>
                    <p><strong>Total:</strong> Rp {{ order.total.toLocaleString() }}</p>
                    <p><strong>Notes:</strong> {{ order.notes || '-' }}</p>
                    
                    <h6>Items:</h6>
                    <ul>
                        <li v-for="item in order.items" :key="item.id">
                            {{ item.name }} - Rp {{ item.price.toLocaleString() }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['orders'])
    },
    created() {
        this.fetchOrders();
    },
    methods: {
        ...mapActions(['fetchOrders']),
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}
</script>
