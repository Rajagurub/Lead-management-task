import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material';
const LoadingScreen=({...others}:any)=>{
     const theme = useTheme();
    console.log(theme.palette.primary.main,"testingTheme")
    return (
        <>
        <LinearProgress sx={{backgroundColor:theme.palette.primary.main}} aria-label="Loading…" />
        <Box sx={{ display: 'flex',height:'100dvh',width:'100%', justifyContent:'center',alignItems:'center' }}>
      <CircularProgress aria-label="Loading…" sx={{color:theme.palette.primary.main}} />
    </Box>
        </>
          
    )
}


export default LoadingScreen