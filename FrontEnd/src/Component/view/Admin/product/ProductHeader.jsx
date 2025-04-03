import { useContext } from 'react';
import style from '../../../../assets/ProductHeader.module.css'
import { UserContext } from '../../../Hooks/useContext';

function ProductHeader() {
const {  setSearch } = useContext(UserContext);

const searchProduct = ((data)=>
  {
        setSearch(data)
  })
  return (
   <>
    <div className='container-fluid' style={{boxShadow:'0 0 3px 0'}}>
      <div className='container' >
         <div className={style.productHeader}>
              <ul className={style['product-list']}>
                 <li onClick={()=>searchProduct('Book')}>Books</li>
                 <li  onClick={()=>searchProduct('Pen')}>Pens</li>
                 <li onClick={()=>searchProduct('Notebook')}>Notebook</li>
                 <li onClick={()=>searchProduct('Pencil Case')}>Pencil & Cases</li>
                 <li  onClick={()=>searchProduct('Writing Pad')}>Writing & Pad</li>
                 <li onClick={()=>searchProduct('Sticker')}>Stickers</li>
                 {/* <li onClick={()=>searchProduct('Highlighter')}>HighLighter</li>
                 <li onClick={()=>searchProduct('Pencils')}>Pencils</li> */}
                 {/* <li onClick={()=>searchProduct('Eraser')}>Eraser</li>
                 <li onClick={()=>searchProduct('Diaries')}>Diaries</li>
                 <li onClick={()=>searchProduct('Bag')}>Bag</li>
                 <li onClick={()=>searchProduct('Color')}>Colors</li>
                 <li onClick={()=>searchProduct('Glitter')}>Glitter</li> */}
              </ul>
         </div>
      </div>
    </div>
   </>
  )
}

export default ProductHeader