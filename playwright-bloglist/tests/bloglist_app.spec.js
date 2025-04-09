const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data:{
          name: 'Patricia Togonon',
          username: 'lala94',
          password: 'salainen',
        }
    })

    await request.post('/api/users', {
      data:{
        name: 'Another User',
        username: 'anotherUser',
        password: 'salainen',
      }
    })

    await page.goto('/')

  })

  test('Login form is shown by default', async ({ page }) => {
    const loginHeader = await page.getByRole('heading', { name: 'login to blog list application'})
    await expect(loginHeader).toBeVisible()

    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'lala94', 'salainen')

      await expect(page.getByText('Patricia Togonon logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'lala94', 'wrong')
  
      await expect(page.getByText('Invalid login')).toBeVisible()
      await expect(page.getByText('Patricia Togonon logged-in')).not.toBeVisible()
    })

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'lala94', 'salainen')

      await expect(page.getByText('Patricia Togonon logged-in')).toBeVisible()

    })

    test('blogs are arranged with the most likes first', async ({ page }) => {

      createBlog(page, 'Blog 1', 'Author 1', 'firstblog.com')
      createBlog(page, 'Blog 2', 'Author 2', 'secondblog.com')
      
      const blogTwo = await page.getByText('Blog 2')
      const locatorSecond = await blogTwo.locator('..')
      await locatorSecond.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes: 2', { exact: false })).toBeVisible()

      await page.waitForTimeout(500)

      const listBlogs = await page.locator('.blog').all()

      const firstBlogTitle = await listBlogs[0].textContent()
      expect(firstBlogTitle).toContain('Blog 2 Author 2')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'First blog', 'Matthew Lee', 'firstblog.com' )

      await expect(page.getByText('First Blog Matthew Lee')).toBeVisible()
    })
  describe('like and delete blogs', () => {

    beforeEach(async ({ page }) => {
      createBlog(page, 'Blog for like and delete tests', 'Isaac Tan', 'blogtolike.com')

    
    })

    test('can like blogs', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()

      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes: 3', { exact: false })).toBeVisible()

    })
 
    test('user can delete blogs they created', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
    
      await expect(page.getByText('Blog for like and delete tests Isaac Tan')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      
      await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()

      await page.getByRole('button', { name: 'delete blog' }).click()

      await expect(page.getByText('Blog for like and delete tests Isaac Tan')).not.toBeVisible()
     
      })

    test('users cannot see delete buttons on blogs they did not create', async ({ page }) => {

      await createBlog(page, 'Delete button test', 'Marie Kondo', 'anotheruser.com')

      await page.waitForTimeout(500)

      await expect(page.getByText('Delete button test Marie Kondo')).toBeVisible()    

      await page.getByRole('button', { name: 'logout' }).click()
      
      loginWith(page, 'anotherUser', 'salainen')

      await expect(page.getByText('Another User logged-in')).toBeVisible()      

      await page.getByRole('paragraph').filter({ hasText: 'Delete button test Marie Kondo' }).getByRole('button', { name: 'view' }).click()
      
      await expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()
    })


    })
  })
})