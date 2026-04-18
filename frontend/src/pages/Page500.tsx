import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import { useTheme } from '@mui/material';
const Page500=()=>{
             const theme = useTheme();
    return (
      <Box sx={{height:'100dvh',width:'100%',justifyContent:'center',alignItems:'center',display:'flex'}}>
            <Box>
           <Typography sx={{fontSize:`30px!important`,textAlign:'center',color:theme.palette.error.main}} variant='h2'>{"Under maintenance"}</Typography>
            <Typography sx={{marginTop:'10px',textAlign:'center',color:theme.palette.error.main}} variant='h6'>{" Page  under maintenance is temporarily"}</Typography>
            </Box>
        </Box >
    )
}
export default Page500;