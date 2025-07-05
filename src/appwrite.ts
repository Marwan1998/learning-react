import { Client, Databases, Query, ID } from 'appwrite'

const AppwriteProjectID = import.meta.env.VITE_APPWRITE_PROJECT_ID as string;
const AppwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT as string;
const DBID = import.meta.env.VITE_APPWRITE_DB_ID as string;
const CollectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID as string;

interface Movie {
  id: string;
  poster_path?: string;
}

interface TrendingMovie {
  $id: string;
  title: string;
  poster_url: string;
  count: number;
  $collectionId: string
  $databaseId: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
}

const client = new Client()
.setEndpoint(AppwriteEndpoint)
.setProject(AppwriteProjectID);

const database = new Databases(client)


export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DBID, CollectionID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        if(result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DBID, CollectionID, doc.$id, {
                count: doc.count + 1,
            })

        } else {
            await database.createDocument(DBID, CollectionID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            })
        }

    } catch (error) {
        console.log(error);
        
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments<TrendingMovie>(DBID, CollectionID, [
      Query.limit(5),
      Query.orderDesc('count')
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};


