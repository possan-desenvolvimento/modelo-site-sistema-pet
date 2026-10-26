(() => {
    "use strict";

    const linhas = `
Visão Geral|Overview|Vista general
Agendamentos|Appointments|Citas
Produtos / Estoque|Products / Inventory|Productos / Inventario
Clientes|Customers|Clientes
Financeiro|Finances|Finanzas
Configurações|Settings|Configuración
Sair do Sistema|Sign out|Cerrar sesión
Administrador|Administrator|Administrador
Personalize o sistema com a identidade do seu negócio.|Personalize the system to match your business.|Personaliza el sistema con la identidad de tu negocio.
👤 Perfil do Usuário|👤 User profile|👤 Perfil de usuario
Essas informações aparecerão no seu painel.|This information will appear on your dashboard.|Esta información aparecerá en tu panel.
Alterar Foto|Change photo|Cambiar foto
Remover foto|Remove photo|Eliminar foto
JPG ou PNG. Máx 2MB.|JPG or PNG. Max 2 MB.|JPG o PNG. Máx. 2 MB.
Nome de Exibição|Display name|Nombre para mostrar
E-mail de Acesso|Login email|Correo de acceso
Salvar Alterações|Save changes|Guardar cambios
Salvar alterações|Save changes|Guardar cambios
As alterações são salvas automaticamente neste navegador, sem envio ao servidor.|Changes are saved automatically in this browser, without being sent to a server.|Los cambios se guardan automáticamente en este navegador, sin enviarlos a un servidor.
Configurações salvas neste navegador.|Settings saved in this browser.|Configuración guardada en este navegador.
Informe um nome de exibição.|Enter a display name.|Introduce un nombre para mostrar.
Escolha uma imagem JPG ou PNG de até 2 MB.|Choose a JPG or PNG image up to 2 MB.|Elige una imagen JPG o PNG de hasta 2 MB.
Não foi possível ler esta imagem. Escolha outro arquivo JPG ou PNG.|Unable to read this image. Choose another JPG or PNG file.|No se pudo leer esta imagen. Elige otro archivo JPG o PNG.
Não foi possível salvar ou carregar as configurações. Verifique se o armazenamento do navegador está liberado e possui espaço.|Unable to save or load settings. Check that browser storage is enabled and has free space.|No se pudo guardar o cargar la configuración. Comprueba que el almacenamiento del navegador esté habilitado y tenga espacio.
🎨 Aparência do Sistema|🎨 System appearance|🎨 Apariencia del sistema
Escolha a cor principal do seu painel.|Choose your dashboard's primary color.|Elige el color principal de tu panel.
Azul Pet (Padrão)|Pet blue (Default)|Azul Pet (Predeterminado)
Verde Natureza|Nature green|Verde naturaleza
Roxo Premium|Premium purple|Morado premium
Laranja Energia|Energy orange|Naranja energía
Vermelho Paixão|Passion red|Rojo pasión
Modo de Exibição|Display mode|Modo de visualización
Claro (Padrão)|Light (Default)|Claro (Predeterminado)
Escuro (Em breve)|Dark (Coming soon)|Oscuro (Próximamente)
Automático (Sistema)|Automatic (System)|Automático (Sistema)
🌍 Preferências e Idioma|🌍 Preferences and language|🌍 Preferencias e idioma
Configure como o sistema se comunica com você.|Choose how the system communicates with you.|Configura cómo se comunica el sistema contigo.
Idioma do Sistema|System language|Idioma del sistema
Fuso Horário|Time zone|Zona horaria
Notificações por E-mail|Email notifications|Notificaciones por correo
Receber resumo diário de agendamentos.|Receive a daily appointment summary.|Recibir un resumen diario de citas.
Alertas de Estoque|Inventory alerts|Alertas de inventario
Avisar quando um produto estiver acabando.|Notify when a product is running low.|Avisar cuando quede poco de un producto.
🔒 Segurança|🔒 Security|🔒 Seguridad
Mantenha sua conta protegida.|Keep your account protected.|Mantén tu cuenta protegida.
Senha Atual|Current password|Contraseña actual
Nova Senha|New password|Nueva contraseña
Confirmar Nova Senha|Confirm new password|Confirmar nueva contraseña
Atualizar Senha|Update password|Actualizar contraseña
O que você deseja gerenciar?|What would you like to manage?|¿Qué deseas gestionar?
Selecione uma das opções abaixo para continuar.|Select an option below to continue.|Selecciona una opción para continuar.
Estoque|Inventory|Inventario
Quantidade, alertas e validade.|Quantities, alerts and expiry dates.|Cantidades, alertas y vencimientos.
Produtos|Products|Productos
Cadastro, preços e fotos.|Registration, prices and photos.|Registro, precios y fotos.
Gerenciamento|Management|Gestión
Gestão de Produtos|Product management|Gestión de productos
Cadastre e gerencie os itens da loja|Register and manage store items|Registra y gestiona los artículos de la tienda
CATÁLOGO DA LOJA|STORE CATALOG|CATÁLOGO DE LA TIENDA
Produtos cadastrados|Registered products|Productos registrados
Itens em estoque|Items in stock|Unidades en inventario
Estoque baixo · até 5 un.|Low stock · up to 5 units|Stock bajo · hasta 5 unidades
Seus produtos|Your products|Tus productos
Um catálogo organizado para cuidar de cada pet.|An organized catalog to care for every pet.|Un catálogo organizado para cuidar de cada mascota.
Controle de estoque →|Inventory control →|Control de inventario →
Pesquisar por nome, categoria ou código de barras|Search by name, category or barcode|Buscar por nombre, categoría o código de barras
Buscar nome, categoria ou código...|Search name, category or code...|Buscar nombre, categoría o código...
➕ Cadastrar Produto (Leitor)|➕ Add product (Scanner)|➕ Registrar producto (Lector)
Tabela de produtos|Product table|Tabla de productos
Catálogo de produtos da loja|Store product catalog|Catálogo de productos de la tienda
Imagem|Image|Imagen
Nome do Produto|Product name|Nombre del producto
Nome do produto|Product name|Nombre del producto
Categoria|Category|Categoría
Preço|Price|Precio
Status|Status|Estado
Ações|Actions|Acciones
Editar|Edit|Editar
Estoque baixo|Low stock|Stock bajo
Estoque Baixo|Low stock|Stock bajo
Normal|Normal|Normal
Nenhum produto encontrado. Tente outro termo.|No products found. Try another search.|No se encontraron productos. Prueba otra búsqueda.
Ambiente de demonstração: os cadastros e as edições ficam somente nesta página e são reiniciados ao recarregar. O controle de estoque possui dados demonstrativos independentes.|Demo: additions and edits stay on this page and reset on reload. Inventory control has independent demo data.|Demostración: los registros y cambios quedan en esta página y se reinician al recargar. El control de inventario tiene datos de demostración independientes.
Ative o JavaScript para visualizar e gerenciar os produtos.|Enable JavaScript to view and manage products.|Activa JavaScript para ver y gestionar los productos.
Cadastrar produto|Add product|Registrar producto
Editar produto|Edit product|Editar producto
Fechar cadastro|Close form|Cerrar formulario
Preencha os dados ou use a câmera para ler o código de barras.|Fill in the details or use the camera to scan the barcode.|Completa los datos o usa la cámara para leer el código de barras.
Modo de cadastro|Registration mode|Modo de registro
Cadastro Manual|Manual entry|Registro manual
Ex.: Ração Premium Cães 10kg|E.g.: Premium dog food 10kg|Ej.: Alimento premium para perros 10kg
Escanear Código|Scan barcode|Escanear código
Posicione o código de barras|Position the barcode|Coloca el código de barras
Mantenha o EAN-13 inteiro no enquadramento e em um local iluminado.|Keep the entire EAN-13 inside the frame in a well-lit area.|Mantén el EAN-13 completo dentro del encuadre en un lugar iluminado.
Tentar câmera novamente|Retry camera|Reintentar cámara
Permita o acesso à câmera. O leitor requer HTTPS ou localhost. Você também pode digitar o código na aba manual.|Allow camera access. The scanner requires HTTPS or localhost. You can also type the code in the manual tab.|Permite el acceso a la cámara. El lector requiere HTTPS o localhost. También puedes escribir el código en la pestaña manual.
✓ Código lido com sucesso! Complete os dados abaixo.|✓ Barcode scanned successfully! Complete the details below.|✓ ¡Código leído correctamente! Completa los datos.
Código de Barras|Barcode|Código de barras
(opcional)|(optional)|(opcional)
13 dígitos do EAN-13|13 EAN-13 digits|13 dígitos del EAN-13
A leitura preenche somente o código; os demais dados são informados manualmente.|Scanning fills only the barcode; enter the other details manually.|La lectura rellena solo el código; los demás datos se introducen manualmente.
Selecione|Select|Selecciona
Rações|Pet food|Alimentos
Brinquedos|Toys|Juguetes
Higiene|Hygiene|Higiene
Acessórios|Accessories|Accesorios
Petiscos|Treats|Premios
Preço (R$)|Price (BRL)|Precio (BRL)
Estoque (un.)|Stock (units)|Stock (unidades)
URL da imagem|Image URL|URL de la imagen
Use uma URL HTTPS ou HTTP.|Use an HTTPS or HTTP URL.|Usa una URL HTTPS o HTTP.
Cancelar|Cancel|Cancelar
Salvar produto|Save product|Guardar producto
Informe o nome do produto.|Enter the product name.|Introduce el nombre del producto.
Informe um EAN-13 válido com 13 dígitos.|Enter a valid 13-digit EAN-13.|Introduce un EAN-13 válido de 13 dígitos.
Este código de barras já está cadastrado em outro produto.|This barcode is already registered for another product.|Este código de barras ya está registrado para otro producto.
Use uma URL de imagem HTTP ou HTTPS.|Use an HTTP or HTTPS image URL.|Usa una URL de imagen HTTP o HTTPS.
A câmera precisa de HTTPS ou localhost. Use o cadastro manual neste endereço.|The camera needs HTTPS or localhost. Use manual entry at this address.|La cámara necesita HTTPS o localhost. Usa el registro manual en esta dirección.
Não foi possível carregar o leitor. Verifique sua conexão e recarregue a página, ou use o cadastro manual.|Unable to load the scanner. Check your connection and reload, or use manual entry.|No se pudo cargar el lector. Comprueba tu conexión y recarga, o usa el registro manual.
Solicitando acesso à câmera…|Requesting camera access…|Solicitando acceso a la cámara…
Código inválido. Enquadre novamente um código EAN-13.|Invalid barcode. Reposition an EAN-13 code.|Código inválido. Vuelve a encuadrar un código EAN-13.
Câmera ativa. Aproxime o código de barras para ler.|Camera active. Bring the barcode closer to scan.|Cámara activa. Acerca el código de barras para leerlo.
Não foi possível abrir a câmera. Verifique a permissão, se há uma câmera conectada e se outro aplicativo está usando-a. Tente novamente ou use o cadastro manual.|Unable to open the camera. Check permissions, that a camera is connected and that no other app is using it. Retry or use manual entry.|No se pudo abrir la cámara. Revisa los permisos, que haya una cámara conectada y que ninguna otra aplicación la esté usando. Reintenta o usa el registro manual.
Não foi possível encerrar a câmera. Tente fechar novamente ou recarregue esta página para liberar a câmera.|Unable to stop the camera. Try closing again or reload this page to release it.|No se pudo detener la cámara. Intenta cerrar de nuevo o recarga la página para liberarla.
Erro ao liberar a câmera. Reabra e feche o cadastro para tentar novamente ou recarregue a página.|Error releasing camera. Reopen and close the form to retry, or reload the page.|Error al liberar la cámara. Abre y cierra el formulario para reintentar o recarga la página.
Câmera pausada. Clique em Tentar câmera novamente para continuar.|Camera paused. Click Retry camera to continue.|Cámara pausada. Haz clic en Reintentar cámara para continuar.
Controle de Estoque|Inventory control|Control de inventario
← Voltar|← Back|← Volver
Acompanhe as quantidades e evite faltar produtos.|Track quantities and avoid running out of products.|Controla las cantidades y evita quedarte sin productos.
Atenção: 2 produtos estão com estoque crítico!|Warning: 2 products have critically low stock!|¡Atención: 2 productos tienen stock crítico!
Verifique a lista abaixo e faça a reposição.|Check the list below and restock.|Revisa la lista y repón los productos.
🔍 Pesquisar produto...|🔍 Search products...|🔍 Buscar producto...
➕ Adicionar Produto|➕ Add product|➕ Agregar producto
Produto|Product|Producto
Preço (Un)|Unit price|Precio (unidad)
Qtd Atual|Current quantity|Cantidad actual
Repor|Restock|Reponer
Acompanhe os números do seu negócio.|Track your business performance.|Consulta los números de tu negocio.
Mês|Month|Mes
Ano|Year|Año
Consultar|Search|Consultar
Consultando...|Searching...|Consultando...
Atualizado agora mesmo|Updated just now|Actualizado ahora mismo
Vendas no Mês|Monthly sales|Ventas del mes
Serviços Realizados|Services completed|Servicios realizados
Novos Clientes|New customers|Nuevos clientes
Agendamentos Hoje|Today's appointments|Citas de hoy
Restam 3 horários livres|3 available slots remaining|Quedan 3 horarios disponibles
- igual ao mês anterior|- same as last month|- igual al mes anterior
Entradas e Saídas|Income and expenses|Ingresos y gastos
Realizado por data de pagamento no período|By payment date in the period|Por fecha de pago en el período
Cadastros por dia no período selecionado|Registrations per day in the selected period|Registros por día en el período seleccionado
Gestão de Agendamentos|Appointment management|Gestión de citas
Visualize o calendário e a agenda do dia.|View the calendar and daily schedule.|Consulta el calendario y la agenda del día.
Agendamentos de Hoje|Today's appointments|Citas de hoy
Feito|Done|Hecho
Em Curso|In progress|En curso
Confirmado|Confirmed|Confirmado
Serviços Mais Agendados|Most booked services|Servicios más reservados
Resumo do Dia|Daily summary|Resumen del día
Total Agendado|Total booked|Total reservado
Concluídos|Completed|Completados
Pendentes|Pending|Pendientes
Faturamento Estimado|Estimated revenue|Facturación estimada
Serviços (Hoje)|Services (Today)|Servicios (Hoy)
Produtos (Hoje)|Products (Today)|Productos (Hoy)
Total|Total|Total
Janeiro|January|Enero
Fevereiro|February|Febrero
Março|March|Marzo
Abril|April|Abril
Maio|May|Mayo
Junho|June|Junio
Julho|July|Julio
Agosto|August|Agosto
Setembro|September|Septiembre
Outubro|October|Octubre
Novembro|November|Noviembre
Dezembro|December|Diciembre
Jan|Jan|Ene
Fev|Feb|Feb
Mar|Mar|Mar
Abr|Apr|Abr
Mai|May|May
Jun|Jun|Jun
Jul|Jul|Jul
Ago|Aug|Ago
Set|Sep|Sep
Out|Oct|Oct
Nov|Nov|Nov
Dez|Dec|Dic
Dom|Sun|Dom
Seg|Mon|Lun
Ter|Tue|Mar
Qua|Wed|Mié
Qui|Thu|Jue
Sex|Fri|Vie
Sáb|Sat|Sáb
Gestão de Clientes|Customer management|Gestión de clientes
Conheça seus clientes e traga-os de volta.|Get to know your customers and bring them back.|Conoce a tus clientes y haz que vuelvan.
Total de Clientes|Total customers|Total de clientes
↑ 12 novos este mês|↑ 12 new this month|↑ 12 nuevos este mes
Clientes Ativos|Active customers|Clientes activos
Visitaram nos últimos 30 dias|Visited in the last 30 days|Visitaron en los últimos 30 días
Inativos (Risco)|Inactive (At risk)|Inactivos (En riesgo)
Não voltam há + de 30 dias|No visit in over 30 days|Sin visitas desde hace más de 30 días
🔍 Pesquisar cliente por nome ou telefone...|🔍 Search customers by name or phone...|🔍 Buscar clientes por nombre o teléfono...
➕ Novo Cliente|➕ New customer|➕ Nuevo cliente
Cliente|Customer|Cliente
Contato|Contact|Contacto
Última Visita|Last visit|Última visita
Total Gasto|Total spent|Total gastado
Ativo|Active|Activo
Inativo|Inactive|Inactivo
Ver Perfil|View profile|Ver perfil
Enviar Promoção|Send promotion|Enviar promoción
Enviar Promoção via WhatsApp|Send promotion via WhatsApp|Enviar promoción por WhatsApp
A mensagem abaixo será enviada para|The message below will be sent to|El siguiente mensaje se enviará a
Olá,|Hello,|Hola,
! Sentimos sua falta por aqui. 🐾|! We miss you here. 🐾|! Te extrañamos por aquí. 🐾
Que tal trazer a(o)|How about bringing|¿Qué tal traer a
para um banho nesta semana?|for a bath this week?|para un baño esta semana?
Preparamos um cupom especial de|We prepared a special coupon for|Preparamos un cupón especial de
15% de desconto|15% off|15% de descuento
para vocês!|for you!|para ustedes!
Clique aqui para agendar: [Link do Site]|Click here to book: [Website link]|Haz clic aquí para reservar: [Enlace del sitio]
Enviar Mensagem|Send message|Enviar mensaje
Gestão Financeira|Financial management|Gestión financiera
Acompanhe o fluxo de caixa do seu negócio.|Track your business cash flow.|Controla el flujo de caja de tu negocio.
Mês Referência|Reference month|Mes de referencia
Filtrar|Filter|Filtrar
Entradas no Mês|Monthly income|Ingresos del mes
Saídas no Mês|Monthly expenses|Gastos del mes
Saldo em Caixa|Cash balance|Saldo en caja
Lucro líquido do período|Net profit for the period|Beneficio neto del período
Contas a Receber|Accounts receivable|Cuentas por cobrar
3 boletos pendentes|3 pending bills|3 facturas pendientes
Fluxo de Caixa (Últimos 7 dias)|Cash flow (Last 7 days)|Flujo de caja (Últimos 7 días)
Entradas|Income|Ingresos
Saídas|Expenses|Gastos
Últimos Lançamentos|Recent transactions|Últimos movimientos
Novo Lançamento|New transaction|Nuevo movimiento
Data|Date|Fecha
Descrição|Description|Descripción
Valor|Amount|Importe
Pago|Paid|Pagado
Pendente|Pending|Pendiente
Atrasado|Overdue|Vencido
Baixar|Settle|Liquidar
Pagar|Pay|Pagar
Fixas|Fixed|Fijos
Adicione uma nova entrada ou saída no caixa.|Add a new income or expense transaction.|Agrega un nuevo ingreso o gasto.
Entrada (↓)|Income (↓)|Ingreso (↓)
Saída (↑)|Expense (↑)|Gasto (↑)
Ex: Pagamento Fornecedor|E.g.: Supplier payment|Ej.: Pago a proveedor
Salvar Lançamento|Save transaction|Guardar movimiento
Bem-vindo ao Pet Shop|Welcome to the Pet Shop|Bienvenido al Pet Shop
Como você deseja acessar o sistema?|How would you like to access the system?|¿Cómo deseas acceder al sistema?
Sou Cliente|I'm a customer|Soy cliente
Agendar serviços|Book services|Reservar servicios
Gerenciar o Pet Shop|Manage the Pet Shop|Gestionar el Pet Shop
Usuário|Username|Usuario
Senha|Password|Contraseña
Digite seu usuário|Enter your username|Introduce tu usuario
Digite sua senha|Enter your password|Introduce tu contraseña
Entrar no Painel|Sign in to dashboard|Entrar al panel
Voltar|Back|Volver
Acesso|Login|Acceso
Acesso Restrito|Restricted access|Acceso restringido
Área exclusiva para administradores.|Administrators only.|Área exclusiva para administradores.
Usuário ou senha incorretos.|Incorrect username or password.|Usuario o contraseña incorrectos.
Acesso negado. Faça login primeiro.|Access denied. Please sign in first.|Acceso denegado. Inicia sesión primero.
Início|Home|Inicio
Sobre Nós|About us|Sobre nosotros
Galeria|Gallery|Galería
Serviços|Services|Servicios
Loja & Agendamento|Shop & Appointments|Tienda y citas
Amor e cuidado para o seu melhor amigo.|Love and care for your best friend.|Amor y cuidado para tu mejor amigo.
Banho, tosa e bem-estar animal com profissionais apaixonados pelo que fazem.|Bathing, grooming and pet wellness with passionate professionals.|Baño, peluquería y bienestar animal con profesionales apasionados por lo que hacen.
Acessar Loja|Visit shop|Visitar tienda
Cuidado que transforma|Care that makes a difference|Cuidado que transforma
Por que a rotina de higiene e bem-estar é essencial?|Why is a hygiene and wellness routine essential?|¿Por qué es esencial una rutina de higiene y bienestar?
Manter a higiene do seu pet em dia vai muito além da estética. O banho regular previne doenças de pele, elimina parasitas e mantém a pelagem saudável e brilhante.|Keeping your pet clean goes far beyond appearance. Regular baths prevent skin conditions, eliminate parasites and keep coats healthy and shiny.|La higiene de tu mascota va mucho más allá de la estética. El baño regular previene enfermedades de la piel, elimina parásitos y mantiene el pelaje sano y brillante.
Além disso, a tosa adequada evita o superaquecimento em dias quentes e proporciona conforto. Na nossa unidade, cada animal é tratado de forma única, com produtos hipoalergênicos e atendimento calmo e carinhoso.|Proper grooming also prevents overheating on hot days and provides comfort. We treat each animal individually, with hypoallergenic products and calm, loving care.|Además, un corte adecuado evita el sobrecalentamiento en días calurosos y aporta comodidad. Tratamos a cada animal de forma única, con productos hipoalergénicos y atención tranquila y cariñosa.
Nossa Galeria|Our gallery|Nuestra galería
Veja um pouco do nosso dia a dia.|Take a look at our daily life.|Conoce un poco de nuestro día a día.
Nossos Serviços|Our services|Nuestros servicios
Cuidado completo para cães e gatos.|Complete care for dogs and cats.|Cuidado completo para perros y gatos.
Banho Relaxante|Relaxing bath|Baño relajante
Tosa Higiênica|Hygiene grooming|Corte higiénico
Tosa da Raça|Breed grooming|Corte de raza
1 hora|1 hour|1 hora
2 horas|2 hours|2 horas
Agendar|Book now|Reservar
Cuidando do seu melhor amigo com amor e profissionalismo.|Caring for your best friend with love and professionalism.|Cuidando de tu mejor amigo con amor y profesionalismo.
Navegação|Navigation|Navegación
Contato & Redes|Contact & Social media|Contacto y redes
Como podemos te ajudar?|How can we help you?|¿Cómo podemos ayudarte?
Escolha uma das opções abaixo:|Choose an option below:|Elige una de las siguientes opciones:
Comprar rações e brinquedos|Buy pet food and toys|Comprar alimentos y juguetes
Marcar banho e tosa|Book bathing and grooming|Reservar baño y peluquería
📅 Ir para Agendamentos|📅 Go to appointments|📅 Ir a citas
Voltar ao Início|Back to home|Volver al inicio
← Cliente ou Administrador|← Customer or Administrator|← Cliente o Administrador
Semana do Pet!|Pet week!|¡Semana de las mascotas!
Frete grátis em compras acima de R$ 100,00 e brinde exclusivo.|Free shipping on purchases over R$ 100.00 and an exclusive gift.|Envío gratis en compras superiores a R$ 100,00 y un regalo exclusivo.
Aproveitar Ofertas|Explore offers|Aprovechar ofertas
Ofertas aplicadas no carrinho!|Offers applied to your cart!|¡Ofertas aplicadas al carrito!
Nossos Produtos|Our products|Nuestros productos
Tudo o que seu pet precisa, com entrega ou retirada na loja.|Everything your pet needs, delivered or collected in store.|Todo lo que tu mascota necesita, con entrega o recogida en tienda.
Todos|All|Todos
Mais Vendido|Bestseller|Más vendido
Comprar|Buy|Comprar
Agende o Banho & Tosa|Book bathing & grooming|Reserva baño y peluquería
Escolha o melhor dia e horário para o seu melhor amigo. É rapidinho!|Choose the best day and time for your best friend. It only takes a moment!|Elige el mejor día y horario para tu mejor amigo. ¡Es muy rápido!
1. Seu Nome|1. Your name|1. Tu nombre
Ex: João Silva|E.g.: John Smith|Ej.: Juan Pérez
2. Seu WhatsApp|2. Your WhatsApp|2. Tu WhatsApp
3. Escolha o Dia (Seg a Sáb)|3. Choose a day (Mon to Sat)|3. Elige el día (Lun a Sáb)
4. Escolha o Horário (09h às 17h)|4. Choose a time (9 am to 5 pm)|4. Elige el horario (9 a 17 h)
Confirmar Agendamento|Confirm appointment|Confirmar cita
Agendamento Solicitado!|Appointment requested!|¡Cita solicitada!
Você será redirecionado para o WhatsApp para confirmar com a nossa equipe.|You will be redirected to WhatsApp to confirm with our team.|Se te redirigirá a WhatsApp para confirmar con nuestro equipo.
Entendi|Got it|Entendido
Agendamento|Appointment|Cita
Horário Lotado|Fully booked|Horario completo
Detalhes|Details|Detalles
Menu administrativo|Administration menu|Menú administrativo
Resumo do catálogo|Catalog summary|Resumen del catálogo
Dashboard|Dashboard|Panel
`;
    const dicionario = new Map(linhas.trim().split("\n").map((linha) => {
        const [pt, en, es] = linha.split("|");
        return [pt, { pt, en, es }];
    }));
    let idiomaAtual = "pt";
    const textos = new WeakMap();
    const atributos = new WeakMap();
    const ignorar = "script, style, textarea, [data-nao-traduzir], .produto-nome, #nomeDestinatario, #nomeMensagem, #nomePet";
    const observador = new MutationObserver(() => aplicar(idiomaAtual));
    const configuracaoObservador = { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label"] };

    function traduzir(texto, idioma = idiomaAtual) {
        if (idioma === "pt") return texto;
        const direto = dicionario.get(texto);
        if (direto) return direto[idioma];
        const indice = idioma === "en" ? 0 : 1;
        const regras = [
            [/^Exibindo (\d+) de (\d+) produtos$/, (a, b) => [`Showing ${a} of ${b} products`, `Mostrando ${a} de ${b} productos`][indice]],
            [/^(\d+) un\.?$/, (a) => [`${a} units`, `${a} un.`][indice]],
            [/^Há (\d+) dias$/, (a) => [`${a} days ago`, `Hace ${a} días`][indice]],
            [/^↑ (\d+)% vs mês anterior$/, (a) => [`↑ ${a}% vs last month`, `↑ ${a}% vs el mes anterior`][indice]],
            [/^Dados atualizados para (.+)!$/, (a) => [`Data updated for ${a}!`, `¡Datos actualizados para ${a}!`][indice]],
            [/^Hoje, (.+)$/, (a) => [`Today, ${a}`, `Hoy, ${a}`][indice]],
            [/^Ontem, (.+)$/, (a) => [`Yesterday, ${a}`, `Ayer, ${a}`][indice]],
            [/^Venceu há (\d+) dias$/, (a) => [`Overdue by ${a} days`, `Venció hace ${a} días`][indice]],
            [/^Editar (.+)$/, (a) => [`Edit ${a}`, `Editar ${a}`][indice]],
            [/^(.+): (cadastrado|atualizado) nesta demonstração\.$/, (a, b) => [`${a}: ${b === "cadastrado" ? "added" : "updated"} in this demo.`, `${a}: ${b === "cadastrado" ? "registrado" : "actualizado"} en esta demostración.`][indice]],
            [/^Imagem indisponível: (.+)$/, (a) => [`Image unavailable: ${a}`, `Imagen no disponible: ${a}`][indice]],
            [/^A partir de (R\$ .+)$/, (a) => [`From ${a}`, `Desde ${a}`][indice]],
            [/^(\d+)\. (Banho Relaxante|Tosa Higiênica|Tosa da Raça)$/, (a, b) => `${a}. ${traduzir(b, idioma)}`],
            [/^Seu horário foi pré-reservado para$/, () => ["Your appointment has been tentatively booked for", "Tu cita se ha reservado provisionalmente para"][indice]],
            [/^às$/, () => ["at", "a las"][indice]]
        ];
        for (const [expressao, formatar] of regras) {
            const correspondencia = texto.match(expressao);
            if (correspondencia) return formatar(...correspondencia.slice(1));
        }
        const mesAno = texto.match(/^([A-Za-zÀ-ÿ]+) (\d{4})$/);
        if (mesAno && dicionario.has(mesAno[1])) return `${traduzir(mesAno[1], idioma)} ${mesAno[2]}`;
        const diaMes = texto.match(/^(.+) \((.+)\)$/);
        if (diaMes && dicionario.has(diaMes[1]) && dicionario.has(diaMes[2])) return `${traduzir(diaMes[1], idioma)} (${traduzir(diaMes[2], idioma)})`;
        if (texto.includes(" | ")) return texto.split(" | ").map((parte) => traduzir(parte, idioma)).join(" | ");
        return texto;
    }

    function atualizar(valor, registro) {
        const original = registro && valor === registro.traduzido ? registro.original : valor;
        const central = original.trim();
        return { original, traduzido: central ? original.replace(central, () => traduzir(central)) : original };
    }

    function aplicar(idioma) {
        idiomaAtual = idioma;
        document.documentElement.lang = { pt: "pt-BR", en: "en-US", es: "es" }[idioma];
        observador.disconnect();
        // O valor de uma option sem atributo value acompanha seu texto; fixe-o antes de traduzir.
        document.querySelectorAll("option:not([value])").forEach((opcao) => opcao.setAttribute("value", opcao.value));
        const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const no = walker.currentNode;
            if (!no.parentElement || no.parentElement.closest(ignorar)) continue;
            const registro = atualizar(no.nodeValue, textos.get(no));
            textos.set(no, registro);
            if (no.nodeValue !== registro.traduzido) no.nodeValue = registro.traduzido;
        }
        document.querySelectorAll("[placeholder], [title], [aria-label]").forEach((elemento) => {
            if (elemento.closest(ignorar)) return;
            const registros = atributos.get(elemento) || {};
            ["placeholder", "title", "aria-label"].forEach((atributo) => {
                if (!elemento.hasAttribute(atributo)) return;
                const registro = atualizar(elemento.getAttribute(atributo), registros[atributo]);
                registros[atributo] = registro;
                if (elemento.getAttribute(atributo) !== registro.traduzido) elemento.setAttribute(atributo, registro.traduzido);
            });
            atributos.set(elemento, registros);
        });
        observador.observe(document.documentElement, configuracaoObservador);
    }

    window.PetIdiomas = { traduzir, aplicar };
})();
