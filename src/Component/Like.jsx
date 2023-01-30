import { useEffect, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Like({userData,postData}) {
    const [like,setLike] = useState(null);
    useEffect(()=>{
        let check = postData.likes.includes(userData.userId)?true:false
        setLike(check)

    },[postData])

    // const handleLike = () =>{
    //   if (like==true) {
        
    //   }
    // }
    
  return (
    <div>
        {
            like!=null? 
            <>
            {
              like==true?<FavoriteIcon className={`icon-styling like`}/>:<FavoriteIcon className={`icon-styling dislike`}/>
            }
            </>:
            <></>
        }
    </div>
  )
}

export default Like
