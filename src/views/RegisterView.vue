<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue';
import PageFooter from '@/components/layout/PageFooter.vue';
import RegisterForm from '@/components/register/RegisterForm.vue';
</script>

<template>
    <PageHeader />
    <div class="register_wrapper">
        <RegisterForm />
    </div>
    <PageFooter />

</template>

<style scoped>
.register_wrapper {
    min-height: 60dvh;
    padding: 1rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}
</style>