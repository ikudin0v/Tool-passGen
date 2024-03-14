import React, { useState } from 'react';

function App() {

	const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=.";
	const [passwds, setPasswds] = useState<string[]>([])
	const [passLen, setPassLen] = useState<number>(16)
	const [decodedPwd, setDecodedPwd] = useState<string>()
	const [encodedPwd, setEncodedPwd] = useState<string>()

	function gen_pwd(){
		var password = "";
		for (let i = 0; i < passLen; i++){
				password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
		}
		return password;
	}
	const get_passwds = () => {
		setPasswds([])
		let newPasswds = []
		for (let i = 0; i < 10; i++){
			newPasswds.push(gen_pwd())
		}
		setPasswds(newPasswds)
	}

	const encodePwd = (pwd:string, passPhrase:any) => {
		if (passPhrase) {
			let newPassPhrase = passPhrase.repeat(Math.round(pwd.length/passPhrase.length) + 1)
			let newPwd = ""
			for(let symbol = 0; symbol < pwd.length; symbol++){
				const newSymbols = symbols.repeat(2)
				newPwd = newPwd + newSymbols[symbols.indexOf(pwd[symbol])+symbols.indexOf(newPassPhrase[symbol])]
			}
			return(newPwd)
		}
	}

	const decodePwd = (pwd:string, passPhrase:any) => {
		if (passPhrase) {
			let newPassPhrase = passPhrase.repeat(Math.round(pwd.length/passPhrase.length) + 1)
			let newPwd = ""
			for(let symbol = 0; symbol < pwd.length; symbol++){
				const newSymbols = symbols.repeat(2)
				newPwd = newPwd + newSymbols[symbols.indexOf(pwd[symbol])+symbols.length - symbols.indexOf(newPassPhrase[symbol])]
			}
			return(newPwd)
		}
	}

	return (
		<div className="App d-flex flex-column" style={{fontSize: "0.7rem"}}>

			<div className='mx-3 mt-3 p-3 border border-2 border-warning rounded-4'>
				<h2 className=''>Сгенерировать пароли</h2>
				<div className='d-flex flex-column'>
					<div className='d-flex flex-row'>
						<div className='pt-2 me-3 fs-6'>Длина пароля</div>
						<select className="form-select mb-2" aria-label="Default select example" style={{width: "5rem"}} onChange={(e)=> setPassLen(Number(e.target.value))}>
							<option value={8} selected={passLen===8}>8</option>
							<option value={9} selected={passLen===9}>9</option>
							<option value={10} selected={passLen===10}>10</option>
							<option value={11} selected={passLen===11}>11</option>
							<option value={12} selected={passLen===12}>12</option>
							<option value={13} selected={passLen===13}>13</option>
							<option value={14} selected={passLen===14}>14</option>
							<option value={15} selected={passLen===15}>15</option>
							<option value={16} selected={passLen===16}>16</option>
							<option value={17} selected={passLen===17}>17</option>
							<option value={18} selected={passLen===18}>18</option>
							<option value={19} selected={passLen===19}>19</option>
							<option value={20} selected={passLen===20}>20</option>
						</select>
					</div>

					<input id='genPassPhrase' type="text" placeholder='кодовое слово' className='w-100 form-control mb-2'/>
					<button onClick={() => get_passwds()} className='btn btn-primary mb-2'>Cгенерировать пароли</button>
				</div>
				<div className='d-flex flex-row'>
					<div className='me-3'>
						<div className='fw-bold'>Открытый пароль</div>
						{passwds.map((item) => (
							<div key={item}>{item}</div>
						))}
					</div>
					<div className='me-3'>
						<div className='fw-bold'>Зашифрованный пароль</div>
						{passwds.map((item) => (
							<div key={item}>{encodePwd(item, (document.getElementById("genPassPhrase") as HTMLInputElement).value)}</div>
						))}
					</div>
				</div>
			</div>
			<div className='mx-3 mt-3 p-3 border border-2 border-warning rounded-4'>
				<h2 className=''>Расшифровать пароль</h2>
				<div className='d-flex flex-column'>
					<input id='passwdToDecode' type="text" placeholder='Зашифрованный пароль' className='w-100 form-control mb-2'/>
					<input id='DecodePassPhrase' type="text" placeholder='кодовое слово' className='w-100 form-control mb-2'/>
					<button className='btn btn-primary mb-2' onClick={() => setDecodedPwd(decodePwd((document.getElementById("passwdToDecode") as HTMLInputElement).value, (document.getElementById("DecodePassPhrase") as HTMLInputElement).value))}>Расшифровать</button>
				</div>
				<div className=''>
					<span className='fw-bold'>{"Расшифрованный пароль: "}</span>
					<span>{decodedPwd}</span>
				</div>
			</div>
			<div className='mx-3 mt-3 p-3 border border-2 border-warning rounded-4'>
				<h2 className=''>Зашифровать пароль</h2>
				<div className='d-flex flex-column'>
					<input id='passwdToEncode' type="text" placeholder='Открытый пароль' className='w-100 form-control mb-2'/>
					<input id='EncodePassPhrase' type="text" placeholder='Кодовое слово' className='w-100 form-control mb-2'/>
					<button className='btn btn-primary mb-2' onClick={() => setEncodedPwd(encodePwd((document.getElementById("passwdToEncode") as HTMLInputElement).value, (document.getElementById("EncodePassPhrase") as HTMLInputElement).value))}>Зашифровать</button>
				</div>
				<div className=''>
					<span className='fw-bold'>{"Зашифрованный пароль: "}</span>
					<span>{encodedPwd}</span>
				</div>
			</div>
		</div>
	);
}

export default App
