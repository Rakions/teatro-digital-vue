<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { RegisterParams, UsuarioFetchDashboard } from '@/utils/interfaces';
import { useUserStore } from '@/stores/userStore';

const dialog = ref(false);
const dialogCrear = ref(false);
const usuariosStore = useUserStore();
const props = defineProps({
    usuariosProp: Array as () => UsuarioFetchDashboard[],
})
const usuarioInfoModificar = ref({
    userID: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contrasena: '',
    rol: 0,
});

function abrirCrearUsuario() {
    dialogCrear.value = true;
}

function mostrarRol(rol: number) {
    return rol === 0 ? 'Usuario normal' : 'Administrador';
}

function modificarUsuario(usuario: UsuarioFetchDashboard) {
    usuarioInfoModificar.value.userID = usuario.userID;
    usuarioInfoModificar.value.nombre = usuario.nombre;
    usuarioInfoModificar.value.apellido = usuario.apellido;
    usuarioInfoModificar.value.email = usuario.email;
    usuarioInfoModificar.value.telefono = usuario.telefono;
    usuarioInfoModificar.value.rol = usuario.rol;
    dialog.value = true;
}

function crearUsuario() {
    if (!usuarioInfoModificar.value.nombre || !usuarioInfoModificar.value.apellido || !usuarioInfoModificar.value.email || !usuarioInfoModificar.value.telefono || !usuarioInfoModificar.value.contrasena) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const params: RegisterParams = {
        nombre: usuarioInfoModificar.value.nombre,
        apellido: usuarioInfoModificar.value.apellido,
        email: usuarioInfoModificar.value.email,
        telefono: usuarioInfoModificar.value.telefono,
        contrasena: usuarioInfoModificar.value.contrasena,
        rol: 0
    };

    usuariosStore.registerUser(params)
        .then(response => {
            console.log('Usuario registrado con éxito:', response);
            dialogCrear.value = false;
            usuarioInfoModificar.value = { userID: 0, nombre: '', apellido: '', email: '', telefono: '', contrasena: '', rol: 0 };
        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
            alert('Error al registrar el usuario');
        });
}


function guardarUsuario() {
    // usuariosStore.modificarUsuario(usuarioInfoModificar.value);
    dialog.value = false;
}
</script>

<template>
    <div>
        <button @click="abrirCrearUsuario" class="crear_usuario">Crear Usuario</button>
        <v-dialog v-model="dialogCrear" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    Crear Nuevo Usuario
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogCrear = false">
                        X
                    </v-btn>
                </v-card-title>
                <v-card-text class="texto_tarjeta">
                    <label for="nombre">
                        <span>Nombre: </span>
                        <input type="text" name="nombre" v-model="usuarioInfoModificar.nombre">
                    </label>
                    <label for="apellido">
                        <span>Apellido: </span>
                        <input type="text" name="apellido" v-model="usuarioInfoModificar.apellido">
                    </label>
                    <label for="email">
                        <span>Email: </span>
                        <input type="email" name="email" v-model="usuarioInfoModificar.email">
                    </label>
                    <label for="telefono">
                        <span>Teléfono: </span>
                        <input type="tel" name="telefono" v-model="usuarioInfoModificar.telefono">
                    </label>
                    <label for="contrasena">
                        <span>Contraseña: </span>
                        <input type="password" name="contrasena" v-model="usuarioInfoModificar.contrasena">
                    </label>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialogCrear = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" @click="crearUsuario">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Apellido</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Teléfono</th>
                    <th class="text-left">Rol</th>
                    <th class="text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in props.usuariosProp" :key="usuario.userID">
                    <td>{{ usuario.userID }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.apellido }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.telefono }}</td>
                    <td>{{ mostrarRol(usuario.rol) }}</td>
                    <td>
                        <button @click="modificarUsuario(usuario)">Modificar</button>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    Modificar Usuario
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                        X
                    </v-btn>
                </v-card-title>
                <v-card-text class="texto_tarjeta">
                    <!-- Los campos para modificar usuario, similares a crear usuario -->
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" @click="guardarUsuario">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.crear_usuario {
    margin-bottom: 10px;
}

.texto_tarjeta {
    display: flex;
    flex-direction: column;
}

.texto_tarjeta label {
    margin-bottom: 10px;
}
</style>