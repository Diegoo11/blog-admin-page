import Title from '../components/Home/Title';
import Card from '../components/Home/Card';
import Options from '../components/Home/Options';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';

const getData = async () => {
  await dbConnect();

  let data;
  try {
    data = await Article.find({});
  } catch (error) {
    console.log(error);
    return [];
  }
  return data;
};

export default async function Page() {
  const data = await getData();
  return (
    <div className=" w-full px-6">
      <Title />
      <Options />
      {
        data.map((article) => (
          <Card
            key={article._id}
            title={article.title}
            author={article.author}
            description={article.description}
            content={article.content}
            type={article.type}
            image={article.image}
            path={article.path}
            pdf={article.pdf}
            date={article.date}
            id={article.id}
          />
        ))
      }
    </div>
  );
}
