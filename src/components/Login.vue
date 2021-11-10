<template>
    <div class="container-login100">
        <div class="wrap-login100">
            <form class="login100-form validate-form" ref="form">
                <!-- <span class="login100-form-logo">
                    <i class="zmdi zmdi-landscape"></i>
                </span> -->

                <span class="login100-form-title p-t-27">
                    Лабиринт
                </span>
              <span class="login100-form-subtitle p-b-34">авторизация через thesims.cc</span>

                <div class="wrap-input100 validate-input" data-validate="Необходимо заполнить">
                    <input v-model="username" class="input100" type="text" placeholder="Логин" required>
                    <span class="focus-input100" data-placeholder=""></span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Необходимо заполнить">
                    <input v-model="password" class="input100" type="password" placeholder="Пароль" required>
                    <span class="focus-input100" data-placeholder=""></span>
                </div>

                <p v-if="errorMessage">
                    {{ errorMessage }}
                </p>

                <div class="container-login100-form-btn">
                    <button
                        class="login100-form-btn"
                        @click="loginHandler"
                        :disabled="submitted"
                    >
                        Войти
                    </button>
                </div>

                <div class="text-center p-t-90">
                    <a class="txt1" href="https://thesims.cc/lost-password/">
                        Забыли пароль?
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { authService } from '../services/index.js'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    submitted: false,
    errorMessage: null
  }),
  methods: {
      loginHandler (evt) {
          evt.preventDefault()
          this.submitted = true

          authService.login({ username: this.username, password: this.password })
            .catch((response) => {
                this.errorMessage = response.data.message
                this.submitted = false
            })
      }
  }
}
</script>

<style scoped>
.container-login100 {
    background-image: url('/images/main.jpg');
}

.container-login100::before {
    background-color: rgb(0 0 0 / 50%);
}

.wrap-login100 {
    background: -webkit-linear-gradient(top, #1eabbd, #0c0c0c);
}

.login100-form-btn {
    background: -webkit-linear-gradient(top,#1ea1b1, #1c7c88);
}
</style>
