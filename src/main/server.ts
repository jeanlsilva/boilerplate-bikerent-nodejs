require('dotenv').config();
import app from '@/main/config/app';

app.listen(process.env.PORT || 4000, () => {
  console.log('Server running...');
});
