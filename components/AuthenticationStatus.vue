<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth()
const email = ref('')
const password = ref('')
const handleSubmit = async () => {
  await signIn('credentials', { email: email.value, password: password.value })
}
</script>

<template>
    <div class="w-full max-w-5xl mx-auto bg-white px-5 py-4 rounded-t shadow-xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img
              v-if="status === 'authenticated' && data?.user?.image"
              class="w-12 h-12 rounded-full"
              :src="data.user.image"
              alt="User Avatar"
          />
          <h1 v-if="status === 'authenticated'" class="text-lg">
            Authenticated as {{ data?.user?.name }}!
          </h1>
          <h1 v-else>
            Not logged in
          </h1>
        </div>
        <button v-if="status === 'authenticated'" class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg" @click="signOut({ callbackUrl: '/' })">
          <span>Logout</span>
        </button>
        <form v-else class="flex items-center space-x-2" @submit.prevent="handleSubmit">
          <label class="leading-6">Email:</label>
          <input v-model="email" class="border p-1" type="email" placeholder="Email" />
          <label>Password:</label>
          <input v-model="password" class="border p-1" type="password" placeholder="Password" />
          <button type="submit" class="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-lg py-2 px-3 text-lg">
            <i class="fa fa-right-to-bracket pt-0.5" />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
</template>
