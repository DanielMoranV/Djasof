<template>
    <h1 class="text-center">Login</h1>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 20, offset: 2 }" :lg="{span: 12, offset: 6}" :xl="{span: 6, offset: 9}">
            <a-form
                name="basicLogin"
                autocomplete="off"
                layout="vertical"
                :model="formState"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    name="email"
                    label="Ingrese tu correo"
                    :rules="[
                        {
                            required: true,
                            whitespace: true,
                            type: 'email',
                            message: 'Ingresa un email válido',
                        },
                    ]"
                >
                    <a-input v-model:value="formState.email">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    name="password"
                    label="Ingrese contraseña"
                    :rules="[
                        {
                            required: true,
                            min: 6,
                            whitespace: true,
                            message:
                                'Ingresa una contraseña con mínimo 6 carácteres',
                        },
                    ]"
                >
                    <a-input-password
                        v-model:value="formState.password"
                    >
                    <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
                </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser"
                        >Ingresar</a-button
                    >
                </a-form-item>
                <a-form-item>
                    <a-button
                        type="primary"
                        html-type="button"
                        ><router-link to="/register">Register</router-link></a-button
                    >
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const userStore = useUserStore();

const formState = reactive({
    email: "skaan.dmv@gmail.com",
    password: "skaan3264",
});

const onFinish = async (values) => {
    //console.log("Success:", values);
    const error = await userStore.loginUser(
        formState.email,
        formState.password
    );
    console.log("lee esto:",error)
    if (!error) {
        return message.success("Bienvenidos a la super apps");
    }

    switch (error) {
        case "auth/user-not-found":
            message.error("No existe el correo registrado");
            break;
        case "auth/wrong-password":
            message.error("Error de contraseña");
            break;
        default:
            message.error(
                "Ocurrió un error en el servidor intentelo más tarde..."
            );
            break;
    }
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
</script>
