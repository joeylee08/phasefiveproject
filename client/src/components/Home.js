import NavBar from './NavBar'
import Header from './Header'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import UserInfo from './UserInfo'
import Map from './Map'

const Home = () => {
  const { loginType, currentUser } = useContext(UserContext)
  const title = loginType === 'user' ? 'Manna Foods Home' : 'Manna Foods Business Home'
  const address = currentUser.location || '3 United Nations Plaza, New York, NY 10017'

  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  const quotes = [['The real voyage of discovery consists not in seeking new landscapes but in having new eyes.', '-Marcel Proust'], ['It is only with the heart that one can see rightly.', '-Antoine de Saint-Exupery'], ['There is some good in this world, and it’s worth fighting for.', '-J.R.R. Tolkien'], ['Beware; for I am fearless, and therefore powerful.', '-Mary Shelley'], ['The only way out of the labyrinth of suffering is to forgive.', '-John Green'], ['We accept the love we think we deserve.', '-Stephen Chobosky'], ['There are years that ask questions and years that answer.', '-Zora Neale Hurston'], ['It is nothing to die; it is dreadful not to live.', '-Victor Hugo'], ['Why, sometimes, I’ve believed as many as six impossible things before breakfast.', '-Lewis Carroll'], ['It is our choices, Harry, that show what we truly are, far more than our abilities.', '-J.K. Rowling'], ['There are some things you learn best in calm, and some in storm.', '-Willa Cather'], ['The world breaks everyone, and afterward, many are strong at the broken places.', '-Ernest Hemingway'], ['It doesn’t matter who you are or what you look like, so long as somebody loves you.', '-Roald Dahl'], ['And, when you want something, all the universe conspires in helping you to achieve it.', '-Paolo Cohelo'], ['There is always something left to love.', '-Gabriel Garcia Marquez'], ['Love is the longing for the half of ourselves we have lost.', '-Milan Kundera'], ['For you, a thousand times over.', '-Khaled Hosseini'], ['All human wisdom is summed up in these two words – \‘Wait and hope.', '-Alexandre Dumas'], ['What does the brain matter compared with the heart?', '-Virginia Woolf'], ['‘But man is not made for defeat,’ he said. ‘A man can be destroyed but not defeated.\'', '-Ernest Hemingway'], ['If we are honest, we can evolve.', '-Wendy Parr'], ['The only thing necessary for the triumph of evil is for good men to do nothing.', '-Edmund Burke'], ['The future doesn\'t belong to the fainthearted; it belongs to the brave.', '-Ronald Reagan'], ['The harder you work, the luckier you get.', '-Neil Donat'], ['Do or do not. There is no try.', '-Master Yoda']];

  const genRandomQuote = () => {
    const rIndex = Math.floor(Math.random() * 25);
    setQuote(quotes[rIndex][0]);
    setAuthor(quotes[rIndex][1]);
  }

  useEffect(() => {
    genRandomQuote()
  }, [])

  return (
    <div className='container'>
      <Header title={title}/>
      <NavBar/>
      <div className='content'>
        <UserInfo />
        <Map mapClass={'homeMap'} center={address} items={[]} />
        <div className='homeQuotes'>
          <h2 className='quote'>{quote}</h2>
          <h3 className='author'>{author}</h3>
        </div>
      </div>
    </div>
  )
}

export default Home