'use client'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes"
import { UsersForm } from "@/components/userForm.component";
import { UserIface } from "@/schemas/user";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";
import { deleteUser, getUsers } from '@/services/users';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AdminTable({ users, session }: any) {

   const [rows, setRows] = useState(users);

   const {
      register,
      handleSubmit,
      reset,
      clearErrors,
      formState,
      formState: { errors, isDirty, dirtyFields }
   } = useForm<UserIface>();

   const editHandler = (row: UserIface, reset: UseFormReset<UserIface>) => (event: any) => {
      console.log(row);

      reset(row)
   }

   const deleteHandler = (row: any) => (event: any) => {
      confirmAlert({
         // title: 'Eliminar Usuari',
         message: 'Vols eliminar l\'usuari: \n' + row.email + ' ?',
         buttons: [
            {
               label: 'Eliminar',
               onClick: async () => {
                  const del = await deleteUser(row.email);
                  if (del) {
                     toast.error('Usuari Eliminat!!', { theme: "colored" });
                     setRows(await getUsers());
                  }
               }
            },
            {
               label: 'Millor no toco res :S',
               // onClick: () => alert('Click No')
            }
         ]
      });
   }

   // useEffect(() => {
   //    console.log('ERRORS: ', formState.errors);
   //    console.log('TOUCHED: ', formState.touchedFields);
   //    console.log('Dirty: ', formState.isDirty);
   //    console.log('Fields: ', formState.dirtyFields);
   // }, [formState])

   let columns: any = [
      {
         name: 'Email',
         selector: (row: any) => row.email,
         sortable: true,
         grow: 2,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Nom',
         selector: (row: any) => row.name,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Cognom',
         selector: (row: any) => row.lastname,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Server',
         selector: (row: any) => row.server,
         sortable: true,
         grow: 2,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'database',
         selector: (row: any) => row.db,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'role',
         selector: (row: any) => row.role,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Licencia',
         selector: (row: any) => Intl.DateTimeFormat("es-ES").format(new Date(row.license?.start)) + ' - ' + Intl.DateTimeFormat("es-ES").format(new Date(row.license?.end)),
         sortable: true,
         grow: 2,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Accions',
         cell: (row: any) => (
            <div className='flex flex-row'>
               <FaPenToSquare onClick={editHandler(row, reset)} className='cursor-pointer m-1'>Edit</FaPenToSquare>
               <FaTrashCan onClick={deleteHandler(row)} className='cursor-pointer m-1'>Delete</FaTrashCan>
            </div>
         ),
         ignoreRowClick: true,
         button: true,
      }
   ];


   createThemes();

   return (
      <div className="flex flex-wrap mt-2">
         <ToastContainer />
         <div className="mr-2 mb-2 basis-3/4 rounded-md">
            <DataTable
               columns={columns}
               data={rows}
               theme={'custom'}
            />
         </div>
         <div className="flex basis-1/4 rounded-md bg-light">
            <UsersForm
               register={register}
               handleSubmit={handleSubmit}
               errors={errors}
               clearErrors={clearErrors}
               setRows={setRows}
               toast={toast}
               isDirty={isDirty}
               dirtyFields={dirtyFields}
               reset={reset}
            />
         </div>
      </div>
   )
};

