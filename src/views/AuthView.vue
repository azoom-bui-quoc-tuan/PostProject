<template>
    <div class="auth-form">
        <Loading :active="isLoading" :is-full-page="fullPage"></Loading>
        <v-window>
            <v-tabs centered grow>
                <v-tab>
                    Login
                </v-tab>
                <v-tab-item>
                    <form>
                        <v-text-field label="Email/PhoneNumber" v-model="loginInfor.user"
                            :error-messages="userLoginErrorHandler" @blur="$v.loginInfor.user.$touch()" placeholder="Input">
                        </v-text-field>
                        <v-text-field label="Password" v-model="loginInfor.password" @blur="$v.loginInfor.password.$touch()"
                            type="password" :error-messages="passLoginErrorHandler" placeholder="Input">
                        </v-text-field>
                        <div class="btn">
                            <v-btn @click="login()" :disabled="$v.loginInfor.$invalid || $v.loginInfor.$error">Login</v-btn>
                            <v-btn @click="clearFormLogin">Cancel</v-btn>
                        </div>
                    </form>
                </v-tab-item>
                <v-tab>
                    Register
                </v-tab>
                <v-tab-item>
                    <form>
                        <v-text-field label="Username" v-model="registerInfor.username"
                            @blur="$v.registerInfor.username.$touch()"
                            :error-messages="userNameErrorHandler"></v-text-field>
                        <v-text-field label="Email" @blur="$v.registerInfor.email.$touch()"
                            :error-messages="emailErrorHandler" v-model="registerInfor.email"></v-text-field>
                        <v-app class="app-test">
                            <div class="container-menu">
                                <v-menu class="app-menu" :close-on-content-click="false" :nudge-right="40"
                                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field label="Date of Birth" :value="registerInfor.birthday" v-on="on"
                                            @blur="$v.registerInfor.birthday.$touch()"
                                            :error-messages="dateErrorHandler"></v-text-field>
                                    </template>
                                    <v-date-picker class="date_picker" width="290" locale="en-in" label="Date of Birth"
                                        no-title v-model="registerInfor.birthday" :min="minDate"
                                        :max="maxDate"></v-date-picker>
                                </v-menu>
                            </div>
                        </v-app>
                        <v-text-field label="Phone Number" v-model="registerInfor.phoneNumber"
                            @blur="$v.registerInfor.phoneNumber.$touch()"
                            :error-messages="phoneErrorHandler"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="registerInfor.password"
                            @blur="$v.registerInfor.password.$touch()" :error-messages="passErrorHandler"></v-text-field>
                        <v-text-field label="Confirm Password" :error-messages="confirmPassErrorHandler"
                            @blur="$v.registerInfor.confirmPassword.$touch()" type="password"
                            v-model="registerInfor.confirmPassword"></v-text-field>
                        <v-radio-group row label="Gender:" :error-messages="genderErrorHandler"
                            v-model="registerInfor.gender">
                            <v-radio label="Male" value="Male"></v-radio>
                            <v-radio label="Female" value="Female"></v-radio>
                        </v-radio-group>

                        <div class="btn">
                            <v-btn @click="register()">Register</v-btn>
                            <v-btn @click="clearFormRegister">Cancel</v-btn>
                        </div>
                    </form>
                </v-tab-item>
            </v-tabs>
        </v-window>
    </div>
</template>
<script>
import { or, email, sameAs, helpers, required, minLength } from 'vuelidate/lib/validators'
import * as errorMessages from '../utils/errorMessages'
import ky from '../plugins/key'
import { commit, get } from 'vuex-pathify';
const phoneReg = helpers.regex("phoneReg", /(84|0[3|7|8|9])+([0-9]{8})\b/)
import Vue from 'vue'
import Vuelidate from "vuelidate"
Vue.use(Vuelidate);
export default {
    name: "AppAuth",
    data() {
        return {
            minDate: '1980-01-01',
            maxDate: new Date().toJSON().slice(0, 10),
            fullPage: false,
            loginInfor: {
                user: '',
                password: '',

            },
            registerInfor: {
                username: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                gender: '',
                birthday: ''

            }
        }
    },
    validations: {
        loginInfor: {
            user: {
                required,
                emailOrPhone: or(email, phoneReg)
            },
            password: {
                required,
                password: helpers.regex("password", /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*$/)
            }
        },
        registerInfor: {
            username: {
                required,
                minLength: minLength(5)
            },
            email: {
                required,
                email
            },
            birthday: {
                required
            },
            phoneNumber: {
                required,
                phoneNumber: phoneReg
            },
            password: {
                required,
                passwordRule: helpers.regex("password", /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*$/)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            },
            gender: {
                required,
            }

        }

    },
    methods: {
        pickDate(birthday) {
            this.registerInfor.birthday = birthday
        },
        clearFormLogin() {
            this.$v.loginInfor.$reset()
            for (let attr in this.loginInfor) {
                this.loginInfor[attr] = ''
            }

        },
        clearFormRegister() {
            this.$v.registerInfor.$reset()
            for (let attr in this.registerInfor) {
                this.registerInfor[attr] = ''
            }

        },
        async login() {
            commit('SET_IS_LOADING', true)
            const { user, password } = this.loginInfor
            if (user && password) {
                const users = await ky.get("users", { searchParams: { email: user } }).json();
                if (users.length > 0) {
                    this.$notify({
                        type: "success",
                        text: "Login successful",
                    })
                    commit("SET_CURRENT_USER", users[0])
                    this.$router.push({ name: 'post' })
                }
                else {
                    this.$notify({
                        type: 'error',
                        text: 'Incorrect login infor',
                    });
                }
            } else {
                this.$notify({
                    type: 'error',
                    text: 'Incorrect login infor',
                });
            }
            commit("SET_IS_LOADING", false)
        },
        async register() {
            commit("SET_IS_LOADING", true)
            const regisUser = await ky.post("users", { body: this.registerInfor }).json()
            console.log("res", regisUser)
            if (regisUser) {
                this.$notify({
                    type: "success",
                    text: "Register successfully"
                })
                this.$router.push({ name: "post" })
                commit("SET_CURRENT_USER", this.registerInfor)

            } else {
                this.$notify({
                    type: "error",
                    text: "Register Failure"
                })
            }
            commit("SET_IS_LOADING", false)
        }
    },
    computed: {
        isLoading: get("isLoading")
        ,
        userNameErrorHandler() {
            const origin = this.$v.registerInfor;
            const errors = [];
            if (!origin.username.$dirty) return errors;
            origin.username.required || errors.push(errorMessages.requiredError);
            origin.username.minLength || errors.push(errorMessages.minLengthError(5));
            return errors;
        },
        userLoginErrorHandler() {
            const errors = []
            const origin = this.$v.loginInfor;
            if (!origin.user.$dirty) return errors;
            origin.user.required || errors.push(errorMessages.requiredError);
            origin.user.emailOrPhone || errors.push(errorMessages.emailOrPhoneNumberError);
            return errors
        },
        phoneErrorHandler() {
            const errors = []
            const origin = this.$v.registerInfor;
            if (!origin.phoneNumber.$dirty) return errors;
            origin.phoneNumber.required || errors.push(errorMessages.requiredError);
            origin.phoneNumber.phoneNumber || errors.push(errorMessages.phoneNumberError);
            return errors
        },
        emailErrorHandler() {
            const errors = []
            const origin = this.$v.registerInfor;
            if (!origin.email.$dirty) return errors;
            origin.email.required || errors.push(errorMessages.requiredError);
            origin.email.email || errors.push(errorMessages.emailError);
            return errors
        },
        passErrorHandler() {
            const errors = []
            const origin = this.$v.registerInfor;
            if (!origin.password.$dirty) return errors;
            origin.password.required || errors.push(errorMessages.requiredError);
            origin.password.passwordRule || errors.push(errorMessages.passwordError);
            return errors
        },
        passLoginErrorHandler() {
            const errors = []
            const origin = this.$v.loginInfor;
            if (!origin.password.$dirty) return errors;
            origin.password.required || errors.push(errorMessages.requiredError);
            origin.password.passwordRule || errors.push(errorMessages.passwordError);
            return errors
        },
        confirmPassErrorHandler() {
            const errors = []
            const origin = this.$v.registerInfor;
            if (!origin.confirmPassword.$dirty) return errors;
            origin.confirmPassword.required || errors.push(errorMessages.requiredError);
            origin.confirmPassword.sameAsPassword || errors.push(errorMessages.confirmPasswordError);
            return errors
        },
        genderErrorHandler() {
            const errors = []
            const origin = this.$v.registerInfor;
            if (!origin.gender.$dirty) return errors;
            origin.gender.required || errors.push(errorMessages.requiredError);
            return errors
        },
        dateErrorHandler() {
            const errors = []
            const origin = this.$v.registerInfor;
            if (!origin.birthday.$dirty) return errors;
            origin.birthday.required || errors.push(errorMessages.requiredError);
            return errors
        }
    }


}
</script>
<style lang="scss" scoped>
.auth-form {
    background-color: rgb(238, 234, 234);
    height: 100vh;
    border: 1px solid;
    padding: 20px;

    .v-tabs {
        max-width: 573px;
        margin: 0px auto;
        padding: 10px;
        border-radius: 8px;
        background-color: white;

        .btn {
            .v-btn {
                margin-left: 10px;
                margin-bottom: 2px;
            }
        }

    }

}

.app-test {
    margin-top: 0 !important;
    height: 60px;
    position: relative;
}

.date-picker {
    position: relative !important;
    bottom: 100px !important;
}
</style>