import Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
const Page500=()=>{
         const theme = useTheme();
    return (
        <Box sx={{height:'100dvh',width:'100%',justifyContent:'center',alignItems:'center',display:'flex'}}>
            <Box>
           <Typography sx={{fontSize:`100px!important`,textAlign:'center',color:theme.palette.error.main}} variant='h2'>{"404"}</Typography>
            <Typography sx={{marginTop:'10px',color:theme.palette.error.main}} variant='h4'>{"Page Not Found"}</Typography>
            </Box>
        </Box >
    )
}
export default Page500;