import Title from '@/app/components/Home/Title';
import EditForm from '@/app/admin/editar/EditForm';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';

const getData = async ({ path }) => {
  await dbConnect();
  let data;
  try {
    data = await Article.findOne({ path });
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default async function Page({ searchParams }) {
  const data = await getData(searchParams);
  return (
    <div className="w-full px-6">
      <Title text="EDITAR ARTICULO" />
      <EditForm
        titleProp={data.title}
        authorProp={data.author}
        descriptionProp={data.description}
        contentProp={data.content}
        typeProp={data.type}
        imageUrlProps={data.image}
        id={data.id}
      />
    </div>
  );
}
