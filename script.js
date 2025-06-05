document.addEventListener('DOMContentLoaded', function() {
    const meserosGrid = document.querySelector('.meseros-grid');
    const fotoEmpleadoMes = document.getElementById('foto-empleado-mes');
    const nombreEmpleadoMes = document.getElementById('nombre-empleado-mes');
    const descripcionEmpleadoMes = document.getElementById('descripcion-empleado-mes');

    // Datos de los meseros (reemplaza con tus datos reales)
    // Para las fotos, usa rutas relativas a donde guardarás las imágenes.
    // Ejemplo: 'images/mesero1.jpg' si creas una carpeta 'images'.
    // Por ahora, usaré placeholders de via.placeholder.com
    const meserosData = [
        { id: 1, nombre: "Carlos López", descripcion: "10 años de experiencia en bodas y eventos corporativos. Amable y eficiente.", foto: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Mesero1", calificacion: 0, votos: 0 },
        { id: 2, nombre: "Ana Martínez", descripcion: "Especialista en servicio de banquetes y atención al detalle. Siempre sonriente.", foto: "https://via.placeholder.com/150/00FF00/FFFFFF?Text=Mesero2", calificacion: 0, votos: 0 },
        { id: 3, nombre: "Pedro Ramírez", descripcion: "Joven dinámico con gran actitud de servicio. Ideal para fiestas juveniles.", foto: "https://via.placeholder.com/150/0000FF/FFFFFF?Text=Mesero3", calificacion: 0, votos: 0 },
        { id: 4, nombre: "Sofía Hernández", descripcion: "Experta en coctelería y servicio VIP. Elegancia y profesionalismo.", foto: "https://via.placeholder.com/150/FFFF00/000000?Text=Mesero4", calificacion: 0, votos: 0 },
        { id: 5, nombre: "Javier Torres", descripcion: "Gran capacidad de organización y trabajo bajo presión. Líder nato.", foto: "https://via.placeholder.com/150/FF00FF/FFFFFF?Text=Mesero5", calificacion: 0, votos: 0 },
        { id: 6, nombre: "Laura Gómez", descripcion: "Atención personalizada y excelente memoria para pedidos. Muy proactiva.", foto: "https://via.placeholder.com/150/00FFFF/000000?Text=Mesero6", calificacion: 0, votos: 0 },
        { id: 7, nombre: "Miguel Ángel Díaz", descripcion: "Experiencia en restaurantes de alta cocina. Protocolo y etiqueta impecables.", foto: "https://via.placeholder.com/150/F0A0F0/FFFFFF?Text=Mesero7", calificacion: 0, votos: 0 },
        { id: 8, nombre: "Verónica Cruz", descripcion: "Servicial y con gran carisma, hace que los invitados se sientan especiales.", foto: "https://via.placeholder.com/150/A0F0A0/000000?Text=Mesero8", calificacion: 0, votos: 0 },
        { id: 9, nombre: "Ricardo Solís", descripcion: "Eficiente en el manejo de múltiples mesas. Rápido y organizado.", foto: "https://via.placeholder.com/150/A0A0F0/FFFFFF?Text=Mesero9", calificacion: 0, votos: 0 },
        { id: 10, nombre: "Gabriela Peña", descripcion: "Pasión por el servicio y la hospitalidad. Siempre dispuesta a ayudar.", foto: "https://via.placeholder.com/150/F0F0A0/000000?Text=Mesero10", calificacion: 0, votos: 0 },
        { id: 11, nombre: "Fernando Luna", descripcion: "Confiable y puntual. Se adapta fácilmente a diferentes tipos de eventos.", foto: "https://via.placeholder.com/150/800000/FFFFFF?Text=Mesero11", calificacion: 0, votos: 0 },
        { id: 12, nombre: "Isabel Reyes", descripcion: "Detallista y observadora, anticipa las necesidades de los comensales.", foto: "https://via.placeholder.com/150/008000/FFFFFF?Text=Mesero12", calificacion: 0, votos: 0 },
        { id: 13, nombre: "Óscar Morales", descripcion: "Trabaja bien en equipo y mantiene la calma en situaciones de alta demanda.", foto: "https://via.placeholder.com/150/000080/FFFFFF?Text=Mesero13", calificacion: 0, votos: 0 },
        { id: 14, nombre: "Patricia Vargas", descripcion: "Excelente comunicación con clientes y compañeros. Muy resolutiva.", foto: "https://via.placeholder.com/150/808000/FFFFFF?Text=Mesero14", calificacion: 0, votos: 0 },
        { id: 15, nombre: "David Castillo", descripcion: "Dedicado a ofrecer una experiencia memorable. Cortés y profesional.", foto: "https://via.placeholder.com/150/800080/FFFFFF?Text=Mesero15", calificacion: 0, votos: 0 }
    ];

    // Cargar calificaciones desde localStorage (opcional, para persistencia básica)
    function cargarCalificaciones() {
        const calificacionesGuardadas = JSON.parse(localStorage.getItem('calificacionesMeseros'));
        if (calificacionesGuardadas) {
            meserosData.forEach(mesero => {
                const dataGuardada = calificacionesGuardadas.find(m => m.id === mesero.id);
                if (dataGuardada) {
                    mesero.calificacion = dataGuardada.calificacion;
                    mesero.votos = dataGuardada.votos;
                }
            });
        }
    }

    // Guardar calificaciones en localStorage
    function guardarCalificaciones() {
        const paraGuardar = meserosData.map(m => ({ id: m.id, calificacion: m.calificacion, votos: m.votos }));
        localStorage.setItem('calificacionesMeseros', JSON.stringify(paraGuardar));
    }


    // Renderizar tarjetas de meseros
    function renderizarMeseros() {
        meserosGrid.innerHTML = ''; // Limpiar grid
        meserosData.forEach(mesero => {
            const card = document.createElement('div');
            card.classList.add('mesero-card');
            card.dataset.id = mesero.id;

            // Para la alternancia de imagen-descripción, controlaremos el orden con CSS (flex-direction)
            // El HTML siempre tendrá la misma estructura interna para simplificar.
            card.innerHTML = `
                <div class="mesero-info">
                    <img src="${mesero.foto}" alt="${mesero.nombre}">
                    <h3>${mesero.nombre}</h3>
                    <p>${mesero.descripcion}</p>
                </div>
                <div class="mesero-rating">
                    <h4>Evaluar:</h4>
                    <div class="stars" data-mesero-id="${mesero.id}">
                        ${[1,2,3,4,5].map(val => <i class="far fa-star" data-value="${val}"></i>).join('')}
                    </div>
                    <p>Calificación: <span class="current-rating">${mesero.votos > 0 ? (mesero.calificacion / mesero.votos).toFixed(1) : 'N/A'}</span> (${mesero.votos} votos)</p>
                </div>
            `;
            meserosGrid.appendChild(card);
            actualizarEstrellasVisuales(card.querySelector('.stars'), mesero.votos > 0 ? (mesero.calificacion / mesero.votos) : 0);
        });
        agregarListenersEstrellas();
        actualizarEmpleadoDelMes();
    }

    // Actualizar visualización de estrellas
    function actualizarEstrellasVisuales(starsContainer, ratingPromedio) {
        const estrellas = starsContainer.querySelectorAll('.fa-star');
        estrellas.forEach(star => {
            star.classList.remove('fas'); // Quita sólido (llena)
            star.classList.add('far');   // Añade contorno (vacía)
            if (star.dataset.value <= Math.round(ratingPromedio)) { // Redondeamos para llenar estrellas completas
                star.classList.remove('far');
                star.classList.add('fas');
            }
        });
    }

    // Agregar listeners a las estrellas
    function agregarListenersEstrellas() {
        const allStarsContainers = document.querySelectorAll('.stars');
        allStarsContainers.forEach(container => {
            const estrellas = container.querySelectorAll('.fa-star');
            estrellas.forEach(star => {
                star.addEventListener('click', function() {
                    const meseroId = parseInt(container.dataset.meseroId);
                    const valor = parseInt(this.dataset.value);
                    registrarCalificacion(meseroId, valor);
                });

                star.addEventListener('mouseover', function() {
                    const valorHover = parseInt(this.dataset.value);
                    estrellas.forEach(s => {
                        s.classList.remove('fas');
                        s.classList.add('far');
                        if (parseInt(s.dataset.value) <= valorHover) {
                            s.classList.remove('far');
                            s.classList.add('fas');
                        }
                    });
                });

                container.addEventListener('mouseout', function() {
                    // Restaurar al rating actual del mesero
                    const meseroId = parseInt(container.dataset.meseroId);
                    const mesero = meserosData.find(m => m.id === meseroId);
                    actualizarEstrellasVisuales(container, mesero.votos > 0 ? (mesero.calificacion / mesero.votos) : 0);
                });
            });
        });
    }

    // Registrar calificación
    function registrarCalificacion(meseroId, valor) {
        const mesero = meserosData.find(m => m.id === meseroId);
        if (mesero) {
            mesero.calificacion += valor;
            mesero.votos += 1;
            
            // Actualizar la UI para ese mesero
            const card = meserosGrid.querySelector('.mesero-card[data-id="${meseroId}"]');
            if (card) {
                const ratingText = card.querySelector('.current-rating');
                const starsContainer = card.querySelector('.stars');
                const promedio = (mesero.calificacion / mesero.votos).toFixed(1);
                ratingText.textContent = '${promedio} (${mesero.votos} votos)';
                actualizarEstrellasVisuales(starsContainer, promedio);
            }
            
            guardarCalificaciones(); // Guardar en localStorage
            actualizarEmpleadoDelMes();
        }
    }

    // Actualizar empleado del mes
    function actualizarEmpleadoDelMes() {
        let mejorMesero = null;
        let maxRatingPromedio = -1;

        meserosData.forEach(mesero => {
            if (mesero.votos > 0) {
                const promedio = mesero.calificacion / mesero.votos;
                if (promedio > maxRatingPromedio) {
                    maxRatingPromedio = promedio;
                    mejorMesero = mesero;
                } else if (promedio === maxRatingPromedio && mejorMesero && mesero.votos > mejorMesero.votos) {
                    // Desempate por número de votos si el promedio es igual
                    mejorMesero = mesero;
                }
            }
        });

        if (mejorMesero) {
            fotoEmpleadoMes.src = mejorMesero.foto;
            fotoEmpleadoMes.alt = mejorMesero.nombre;
            nombreEmpleadoMes.textContent = mejorMesero.nombre;
            descripcionEmpleadoMes.textContent = '¡Felicidades! Con un promedio de ${maxRatingPromedio.toFixed(1)} estrellas en ${mejorMesero.votos} valoraciones.';
        } else {
            fotoEmpleadoMes.src = "placeholder_destacado.jpg"; // Placeholder
            fotoEmpleadoMes.alt = "Empleado del Mes";
            nombreEmpleadoMes.textContent = "Aún por determinar";
            descripcionEmpleadoMes.textContent = "¡El miembro del equipo con la mejor valoración aparecerá aquí!";
        }
    }

    // Funcionalidad para FAQ (acordeón)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            
            // Cerrar todos los demás
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-question').classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.faq-answer').style.paddingTop = null;
                otherItem.querySelector('.faq-answer').style.paddingBottom = null;

            });

            // Abrir o cerrar el actual
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.paddingTop = "15px";
                answer.style.paddingBottom = "15px";
            } else {
                // Ya estaba activo, así que solo lo cerramos (la parte de arriba ya cerró todo)
            }
        });
    });

    // Inicialización
    cargarCalificaciones();
    renderizarMeseros();
});