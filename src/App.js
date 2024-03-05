import logo from './logo.svg';
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { addData  ,deleteData,updateData} from './Redux/Action';
function App() {
  const userinfo = useSelector((state) => state.userData || []);
  const [id,setId] =useState("")
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(input));
    setInput({
      name: '',
      age: '',
      gender: '',
      email: '',
      password: '',
    });
  };

  const DeleteData = (id) => {
    dispatch(deleteData(id));
  }
  const EditData = (id) => {
    const selectedData = userinfo[id];
    if (selectedData) {
      setId(id);
      setInput({
        name: selectedData.name || '',
        age: selectedData.age || '',
        gender: selectedData.gender || '',
        email: selectedData.email || '',
        password: selectedData.password || '',
      })

    }
  };
  const UpdateUser = (e) => {
    e.preventDefault();

    const updatevalue = {
      id: id,
      name: input.name,
      age: input.age,
      gender: input.gender,
      email: input.email,
      password: input.password,
    };
    dispatch(updateData(updatevalue));
    setInput({
      name: '',
      age: '',
      gender: '',
      email: '',
      password: '',
    })
    setId('');
  };

  return (
   <>
        <h2 className='text-center m-5'>Redux Crud Operation</h2>
      <form action="" className='text-center' onSubmit={id !== "" ? UpdateUser : handleSubmit}>
        <label htmlFor="" className='fw-bold p-2'>Name :  </label>
        <input type="text" name='name' className='fw-bold py-2' value={input.name} onChange={handleChange}
          placeholder='Enter Your Name' required />
        <br />
        <br />
         <label htmlFor="" className='fw-bold p-2'>Email :  </label>
        <input type="email" name='email' className='fw-bold py-2' value={input.email} onChange={handleChange}
          placeholder='Enter Your Email' required />
        <br />
        <br />
        <label htmlFor="" className='fw-bold p-2'>Password :  </label>
        <input type="password" name='password' className='fw-bold py-2' value={input.password} onChange={handleChange}
          placeholder='Enter Your Name' required />
        <br />
        <br /> 
        <button type="submit" class="bn29" value={id !== "" ? "Update Data" : "Save"}  >Save</button>
      </form>
      <br /><br />

      <table border="1" className='table table-bordered border-dark w-75 mt-2 text-center' style={{marginLeft:"200px",}}>
        <thead style={{color:"#5F9EA0"}}>
          <th className="border border-dark ">ID</th>
          <th className="border border-dark ">Name</th>
          <th className="border border-dark ">Email</th>
          <th className="border border-dark ">Password</th>
          <th className="border border-dark ">Action</th>
        </thead>
        <tbody style={{color:"#4682B4"}}>
        {
          userinfo.map((i,index) => {
            return <tr className='border border-primary fw-bold py-2 ps-2'>
              <td className="border border-dark fw-bold pt-3 " >{i.id}</td>
              <td className="border border-dark fw-bold pt-3 ">{i.name}</td>
              <td className="border border-dark fw-bold pt-3 ">{i.email}</td>
              <td className="border border-dark fw-bold pt-3 ">{i.password}</td>
              <button class="bn30" onClick={() => EditData(index)}>Edit</button>
              <button class="bn30" onClick={() => DeleteData(index)}>Delete</button>
            </tr>
          })
        }
      </tbody>
      </table>
    </>
  );
}

export default App;

  