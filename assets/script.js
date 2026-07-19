read();
handleLogic();
add();
edit();

async function read() {
    const loaderRow = document.querySelector('.spin');
    try 
    {
        if (loaderRow) loaderRow.style.display = 'table-row';

        const url = '/api/read.php';
        const res = await fetch(url);

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const result = await res.json();

        if (result.success) {
            if(result.data.length == 0)
            {
                document.getElementById('tbody').innerHTML = `
                    <tr>
                        <td colspan="6">No Product</td>
                    </tr>
                `;
            }
            else
            {
                const rows = result.data.map((user,index)=>{
                return `
                <tr>
                    <td>${user.user_id}</td>
                    <td>
                        <img src="${user.user_image}">
                    </td>
                    <td>${user.user_name}</td>
                    <td>${user.user_email}</td>
                    <td>${user.user_password.slice(0,8)}</td>
                    <td>
                        <button class="btnView" data-id="${user.user_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                        </button>
                        <button class="btnEdit" data-id="${user.user_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                        <button class="btnDelete" data-id="${user.user_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                `;
                }).join('');
                document.getElementById('tbody').innerHTML = rows;
            }
        } 
        else 
        {
            alert('Database Error: ' + result.txt); 
        }
        
    } 
    catch(error) 
    {
        alert('Network Error: ' + error.message);
    } finally {
        if (loaderRow) loaderRow.style.display = 'none';
    }
}


function handleLogic()
{
    const btnAdd = document.getElementById('btnAdd');
    const modal = document.getElementById('modal');
    const cancel = document.getElementById('btnCancel');
    const addImage = document.getElementById('addImage');
    const addPreview = document.getElementById('addPreview');
    const editModal = document.getElementById('editModal');

    btnAdd.addEventListener('click',function(){
        modal.classList.toggle('showModal');
    });

    modal.addEventListener('click',function(e){
        e.target.classList.toggle('showModal');
    });

    cancel.addEventListener('click',function(){
        document.getElementById('formAdd').reset();
        document.getElementById('addPreview').src = '';
        modal.classList.toggle('showModal');
    });

    addImage.addEventListener('change',function(){
        const file = this.files[0];
        const url = URL.createObjectURL(file);
        addPreview.src = url;
    })

    editModal.addEventListener('click',function(e){
        e.target.classList.toggle('showModal');
    });

    const viewModal = document.getElementById('viewModal');

    viewModal.addEventListener('click',function(e){
        if(e.target === viewModal) viewModal.classList.remove('showModal');
    });

    document.getElementById('btnCloseView').addEventListener('click',function(){
        viewModal.classList.remove('showModal');
    });

    document.getElementById('btnCancelEdit').addEventListener('click',function(){
        document.getElementById('formEdit').reset();
        document.getElementById('editPreview').src = '';
        document.getElementById('passwordEdit').placeholder = 'Password';
        document.getElementById('confirmPasswordEdit').placeholder = 'Password';
        editModal.classList.remove('showModal');
    });

    document.getElementById('tbody').addEventListener('click',async function(e){
        const btnView = e.target.closest('.btnView');
        const btnEdit = e.target.closest('.btnEdit');
        const btnDelete = e.target.closest('.btnDelete');

        if(btnView)
        {
            const id = btnView.dataset.id;
            try
            {
                const res = await fetch('/api/get.php?id=' + id);
                const result = await res.json();
                if(result.success)
                {
                    const user = result.data;
                    document.getElementById('viewName').value = user.user_name;
                    document.getElementById('viewEmail').value = user.user_email;
                    document.getElementById('viewPreview').src = user.user_image;
                    viewModal.classList.add('showModal');
                }
            }
            catch(error)
            {
                Alert.show(error.message, 'error');
            }
            return;
        }

        if(btnEdit)
        {
            const id = btnEdit.dataset.id;
            try
            {
                const res = await fetch('/api/get.php?id=' + id);
                const result = await res.json();
                if(result.success)
                {
                    const user = result.data;
                    document.getElementById('editId').value = user.user_id;
                    document.getElementById('nameEdit').value = user.user_name;
                    document.getElementById('emailEdit').value = user.user_email;
                    document.getElementById('editPreview').src = user.user_image;
                    document.getElementById('passwordEdit').value = '';
                    document.getElementById('confirmPasswordEdit').value = '';
                    document.getElementById('passwordEdit').placeholder = 'Leave empty to keep current';
                    document.getElementById('confirmPasswordEdit').placeholder = 'Leave empty to keep current';
                    editModal.classList.add('showModal');
                }
            }
            catch(error)
            {
                Alert.show(error.message, 'error');
            }
            return;
        }

        if(btnDelete)
        {
            confirm('Are you sure you want to delete this?',async function(yes){
                if(!yes) return;
                const id = btnDelete.dataset.id;
                try
                {
                    const data = new FormData();
                    data.append('id', id);
                    const res = await fetch('/api/delete.php',{ method:'POST', body:data });
                    const result = await res.json();
                    if(result.success)
                    {
                        Alert.show('Deleted','success');
                        read();
                    }
                    else
                    {
                        Alert.show(result.txt, 'error');
                    }
                }
                catch(error)
                {
                    Alert.show(error.message, 'error');
                }
            });
            return;
        }
    });

}

function add()
{
    const form = document.getElementById('formAdd');

    form.addEventListener('submit',async function(e){
        e.preventDefault();
        
        data = new FormData(this);

        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');

        if (password !== confirmPassword) {
            Alert.show('Wrong password', 'error', 2000);
            return;
        }

        try 
        {
            const res = await fetch('/api/add.php',{
                method: 'POST',
                body: data
            });

            const rs = await res.json();

            if(rs.success)
            {
                Alert.show('Success','success');
                form.reset();
                document.getElementById('addPreview').src = '';
                read();
            }
            else
            {
                Alert.show(rs.res,'error');
                // confirm('Error hx',function(yes){
                //     console.log(yes);
                // })   
            }
        } 
        catch (error) 
        {
            
        }

    })
}

function edit()
{
    const form = document.getElementById('formEdit');
    const editModal = document.getElementById('editModal');

    form.addEventListener('submit',async function(e){
        e.preventDefault();

        const id = document.getElementById('editId').value;
        const name = document.getElementById('nameEdit').value.trim();
        const email = document.getElementById('emailEdit').value.trim();
        const password = document.getElementById('passwordEdit').value;
        const confirmPassword = document.getElementById('confirmPasswordEdit').value;

        if(password !== confirmPassword)
        {
            Alert.show('Passwords do not match','error',2000);
            return;
        }

        const data = new FormData();
        data.append('id', id);
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('confirmPassword', confirmPassword);

        const imageFile = document.getElementById('editImage').files[0];
        if(imageFile)
        {
            data.append('image', imageFile);
        }

        try
        {
            const res = await fetch('/api/update.php',{ method:'POST', body:data });
            const result = await res.json();

            if(result.success)
            {
                Alert.show('Updated','success');
                form.reset();
                document.getElementById('editPreview').src = '';
                document.getElementById('passwordEdit').placeholder = 'Password';
                document.getElementById('confirmPasswordEdit').placeholder = 'Password';
                editModal.classList.remove('showModal');
                read();
            }
            else
            {
                Alert.show(result.txt, 'error');
            }
        }
        catch(error)
        {
            Alert.show(error.message, 'error');
        }
    })
}