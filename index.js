var firebaseConfig = {
    apiKey: "AIzaSyBKw9gYcx84hkt6VqzkVaQmwuNtHRg95hI",
    authDomain: "pruebafirebase-b1a90.firebaseapp.com",
    databaseURL: "https://pruebafirebase-b1a90-default-rtdb.firebaseio.com",
    projectId: "pruebafirebase-b1a90",
    storageBucket: "pruebafirebase-b1a90.appspot.com",
    messagingSenderId: "751782221887",
    appId: "1:751782221887:web:a92f42205d9212d793c08a"  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='selecciona';
    document.getElementById("Input6").value='selecciona';

}
function createR() {
    //Guardo los datos capturados usando el id de cada control
    var cita = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var edad = document.getElementById("Input3").value;
    var telefono = document.getElementById("Input4").value;
    var sintomas = document.getElementById("Input5").value;
    var padecimieto = document.getElementById("Input6").value;
    var alergias = document.getElementById("Input7").value;

    document.getElementById("Input1").disabled = false;

    //validaciones
    if (cita.length > 0) {
        //creo un objeto que guarda los datos
        var datos = {
            cita, 
            nombre,
            edad,
            telefono,
            sintomas,
            padecimieto,
            alergias,
        }

        //console.log(alumno);

        firebase.database().ref('Citas/' + cita).update(datos).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Citas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(datos){
    
    if(datos!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
      
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = datos.cita;
        cell2.innerHTML = datos.nombre; 
        cell3.innerHTML = datos.edad;
        cell4.innerHTML = datos.telefono; 
        cell5.innerHTML = datos.sintomas;
        cell6.innerHTML = datos.padecimieto; 
        cell7.innerHTML = datos.alergias;
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${datos.cita})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+datos.cita+')">Modificar</button>';
    }
}

function deleteR(cita){
    firebase.database().ref('Citas/' + cita).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(cita){
    var ref = firebase.database().ref('Citas/' + cita);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(datos){
    if(datos!=null)
    {
        document.getElementById("Input1").value=datos.cita;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=datos.nombre;
        document.getElementById("Input3").value=datos.edad;
        document.getElementById("Input4").value=datos.telefono;
        document.getElementById("Input5").value=datos.sintomas;
        document.getElementById("Input6").value=datos.padecimieto;
        document.getElementById("Input7").value=datos.alergias;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Citas");
    ref.orderByChild("sintomas").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(datos){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = datos.cita;
    cell2.innerHTML = datos.nombre; 
    cell3.innerHTML = datos.edad;
    cell4.innerHTML = datos.telefono; 
    cell5.innerHTML = datos.sintomas; 
    cell6.innerHTML = datos.padecimieto; 
    cell7.innerHTML = datos.alergias; 

   
}