let ingresos = [];
let gastos = [];
let editarBandera = null;


// funcion agregar ingresos
document.getElementById('formIngreso').addEventListener('submit',(e)=>{
    e.preventDefault();

    const descripcion = document.getElementById('descripcionIngreso').value;
    const monto = parseFloat(document.getElementById('montoIngreso').value);
    const fecha = document.getElementById('fechaIngreso').value;
    const categoria = document.getElementById('categoriaIngreso').value;

    if(descripcion && monto && fecha && categoria){


        ingresos.push({descripcion,monto,fecha,categoria});
        alert("INGRESO REGISTRADO EXITOSAMENTE");
        
        document.getElementById('formIngreso').reset();
        cargarIngresoIds();
    }

});

document.getElementById('formGasto').addEventListener('submit',(e)=>{
    e.preventDefault();
    const descripcion = document.getElementById('descripcionGasto').value;
    const monto = document.getElementById('montoGasto').value;
    const fecha = document.getElementById('fechaGasto').value;
    const categoria = document.getElementById('categoriaGasto').value;
    const ingresoId = document.getElementById('ingresoId').value;
    const gasto = {descripcion,monto,fecha,categoria,ingresoId};
    if(descripcion && monto && fecha && categoria && ingresoId){
    if(editarBandera!==null){
        actualizagasto(gasto);
    }else{
        gastos.push({descripcion,monto,fecha,categoria,ingresoId});
        alert("GASTO REGISTRADO EXITOSAMENTE");
    }
        editarBandera=null;
        document.getElementById('formGasto').reset();
        cargarGastos();
    }
});

function actualizagasto(g){
    gastos[editarBandera] = g;
    document.getElementById('btngasto').textContent='Registrar Gasto'
    cargarGastos();
}
//funcion para cargar los ingresos en el select de los gastos
function cargarIngresoIds(){
    const selectIngresoId = document.getElementById('ingresoId');
    const ingresoIdInforme = document.getElementById('ingresoIdInforme');
    
    selectIngresoId.innerHTML ='';
    ingresoIdInforme.innerHTML='';

    const opcion = document.createElement('option');
    opcion.text = 'Selecciona un ingreso';
    opcion.value = "";
    selectIngresoId.appendChild(opcion);
    ingresoIdInforme.appendChild(opcion.cloneNode(true));
    ingresos.forEach((ingreso,index)=>{
        const opcion = document.createElement('option');
        opcion.text = ingreso.descripcion;
        opcion.value = index;
        selectIngresoId.appendChild(opcion);
        ingresoIdInforme.appendChild(opcion.cloneNode(true));
    });
}

function cargarGastos(){
    const listag = document.getElementById('listgastos');
    listag.innerHTML='';
    gastos.forEach((gasto,index)=>{
        const li = document.createElement('li');
        li.innerHTML=`
            ${gasto.descripcion} -- ¢${gasto.monto} -- (${gasto.categoria})
            <button onclick="eliminargasto(${index})">ELIMINAR</button>
            <button onclick="editargasto(${index})">EDITAR</button>
        `;
        listag.appendChild(li);
    });

}

function eliminargasto(index){
    gastos.splice(index,1);
    cargarGastos();
}

function editargasto(index){
    const gasto = gastos[index];
    document.getElementById('descripcionGasto').value = gasto.descripcion;
    document.getElementById('montoGasto').value = gasto.monto;
    document.getElementById('fechaGasto').value = gasto.fecha;
    document.getElementById('categoriaGasto').value = gasto.categoria;
    document.getElementById('ingresoId').value = gasto.ingresoId;
    document.getElementById('btngasto').textContent = "Actualizar";
    editarBandera=index;
}

//inicializar la carga de ingresos al cargar la pagina
window.onload = cargarIngresoIds();

