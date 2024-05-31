const express = require('express');
const app = express();
const {createClient} = require('@supabase/supabase-js')

const supabase = createClient('https://walwibbnedmfzzhqtuqz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbHdpYmJuZWRtZnp6aHF0dXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzNjgxMDUsImV4cCI6MjAxNTk0NDEwNX0.c0CCF50vux3GKvR70ONdZ4E-yjfLu_vgazK0k-LZyN0');

app.get('/',(req,res)=>{
    res.send('Home')
})

app.listen(80,()=>{
    console.log('Server started with port 80');
})