#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
/**
* main - simple code which reads from heap infinitely
* Used as auxiliary program to show how another process changes
* data by manipulating proc filesystem
* Return: 0 on success
*/
int main(void)
{
	char *str;
	char *word = "Holberton";
	size_t i = 0;
	pid_t pid = getpid();

	str = strdup(word);

	for (;; ++i)
	{
		printf("[%lu] [pid: %d] %s [%p]\n", i, pid, str, str);
		sleep(1);
	}
	return 0;
}